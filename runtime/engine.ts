import { NodeVM, VMScript, NodeVMOptions } from "vm2";
import { readFileSync } from "node:fs";

import pino from "pino";

const logger = pino();

/**
 * 调用方式：
 * const engine = new SinppetEngine(option)
 * const script = engine.compile(buf)
 * const result = await engine.run(script)
 */

// 代码片段运行引擎
export class SnippetEngine {
  private _vm: NodeVM;

  // 初始化
  constructor(option: NodeVMOptions = {}) {
    const mergedOption = this._mergeVMOption(option);
    const vm = new NodeVM(mergedOption);
    this._vm = vm;
  }

  private _mergeVMOption(option: NodeVMOptions): NodeVMOptions {
    const defaultOption: NodeVMOptions = {
      console: "inherit",
      sandbox: {
        // fetch: require('node-fetch')
      },
      require: {
        external: true,
        resolve: (moduleName) => {
          return `./node_modules/${moduleName}`;
        },
        builtin: ["*"],
        context: "sandbox",
      },
    };

    const mergedOption: NodeVMOptions = {
      ...defaultOption,
      ...option,
      sandbox: Object.assign({}, defaultOption.sandbox, option.sandbox),
    };

    return mergedOption;
  }

  // 代码编译
  compile(raw: string | VMScript): VMScript {
    try {
      if (typeof raw !== "string") {
        return raw.compile();
      }

      const script = new VMScript(raw);

      return script;
    } catch (error) {
      logger.error(error, "Compile Script Error");
      throw error;
    }
  }

  // 编译指定路径的代码
  // runFile
  compileFile(filepath: string): VMScript {
    try {
      const raw = readFileSync(filepath, { encoding: "utf8" }).toString();
      return this.compile(raw);
    } catch (error) {
      logger.error(error, "Compile File Error");
      throw error;
    }
  }

  // 运行代码
  async run(script: string | VMScript): Promise<any> {
    try {
      const result = this._vm.run(script);
      return await Promise.resolve(result)
    } catch (error) {
      logger.error(error, "Run Script Error");
      throw error;
    }
  }

  // 运行指定路径的文件，直接使用 runFile
  async runFile(filepath: string): Promise<any> {
    try {
      const result = this._vm.runFile(filepath);
      return Promise.resolve(result);
    } catch (error) {
      logger.error(error, "Run File Error");
      throw error;
    }
  }
}
