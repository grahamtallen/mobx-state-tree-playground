import { transform } from "babel-standalone";
import { onAction, onPatch, onSnapshot, getSnapshot } from "mobx-state-tree";
const MST = require("mobx-state-tree");
const MobX = require("mobx");

export function transpile(code) {
  let transformed = "";
  try {
    transformed = transform(code, {
      presets: ["es2015"],
      filename: "repl",
      babelrc: false
    }).code;
  } catch (err) {
    return (
      "throw new Error(" +
      JSON.stringify("Error while compiling: " + err.message) +
      ")"
    );
  }

  return transformed;
}

export function runCode(store) {
  console.clear();
  store.clear();

  let compiledCode = transpile(store.code);
  let sandboxConsole = Object.create(console);

  function capture() {
    const arg = [];
    for (var i = 0; i < arguments.length; i++) {
      arg.push(arguments[i] + '');
    }
    store.addLog(arg.join("\n"));
  }

  ["error", "log", "info", "debug"].forEach(function(key) {
    sandboxConsole[key] = function() {
      Function.prototype.apply.call(console[key], console, arguments);
      capture.apply(this, arguments);
    };
  });

  function sandboxInspect(groundStore) {
    onSnapshot(groundStore, store.addSnapshot);
    onPatch(groundStore, store.addPatch);
    onAction(groundStore, store.addAction);
    store.addSnapshot(getSnapshot(groundStore));
    return groundStore;
  }

  function sandboxRequire(mod) {
    switch (mod.toLowerCase()) {
      case "mobx-state-tree":
        return MST;
      case "mobx":
        return MobX;
      case "mobx-state-tree-playground":
        return { inspect: sandboxInspect };
      default:
        throw new Error("Unable to find module " + mod);
    }
  }

  let exports = {};
  // eslint-disable-next-line
  try {
    new Function("exports", "require", "inspect", "console", compiledCode)(
      exports,
      sandboxRequire,
      sandboxInspect,
      sandboxConsole
    );
  } catch (e) {
    sandboxConsole.error(e);
  }
}
