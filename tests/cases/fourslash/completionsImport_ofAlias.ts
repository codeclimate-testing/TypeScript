/// <reference path="fourslash.ts" />

// Tests that we don't filter out a completion for an alias,
// so long as it's not an alias to a different module.

// @Filename: /a.ts
////const foo = 0;
////export { foo };

// @Filename: /a_reexport.ts
// Should not show up in completions
////export { foo } from "./a";

// @Filename: /b.ts
////fo/**/

goTo.marker("");
const options = { includeExternalModuleExports: true };
// TODO: https://github.com/Microsoft/TypeScript/issues/14003
verify.completionListContains({ name: "foo", source: "/a" }, "import foo", "", "alias", /*spanIndex*/ undefined, /*hasAction*/ true, options);
verify.not.completionListContains({ name: "foo", source: "/a_reexport" }, undefined, undefined, undefined, undefined, undefined, options);

verify.applyCodeActionFromCompletion("", {
    name: "foo",
    source: "/a",
    description: `Import 'foo' from "./a".`,
    // TODO: GH#18445
    newFileContent: `import { foo } from "./a";\r
\r
fo`,
});
