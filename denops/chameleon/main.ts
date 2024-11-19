import type { Denops, Entrypoint } from "jsr:@denops/std@^7.3.2";
import { emit } from "jsr:@denops/std@^7.3.2/autocmd";
import { assert, ensure, is } from "jsr:@core/unknownutil@^4.3.0";
import { check } from "./checker.ts";

export const main: Entrypoint = (denops) => {
  let scheduler: undefined | number;

  const schedule = async (interval: number) => {
    await apply(denops);
    if (scheduler) {
      scheduler = setTimeout(() => schedule(interval), interval);
    }
  };

  denops.dispatcher = {
    apply: async () => {
      await apply(denops);
    },

    enable: async (intervalStr) => {
      if (scheduler) {
        return;
      }
      assert(intervalStr, is.UnionOf([is.String, is.Undefined]));
      const interval = intervalStr
        ? parseInt(intervalStr, 10)
        : ensure(await denops.eval("g:chameleon_interval"), is.Number);
      scheduler = setTimeout(() => schedule(interval), 0);
    },

    disable: () => {
      if (scheduler) {
        clearTimeout(scheduler);
      }
      scheduler = undefined;
    },
  };

  return {
    [Symbol.asyncDispose]() {
      if (scheduler) {
        clearTimeout(scheduler);
      }
      return Promise.resolve();
    },
  };
};

async function apply(denops: Denops) {
  const signal = denops.interrupted;
  const background = await check({ signal });
  signal?.throwIfAborted();
  if (await denops.eval("&background") !== background) {
    await denops.cmd(`set background=${background}`);
    await emit(denops, "User", `ChameleonBackgroundChanged:${background}`, {
      nomodeline: true,
    });
  }
}
