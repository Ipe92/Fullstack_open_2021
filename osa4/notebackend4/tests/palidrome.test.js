const palidrome = require("../utils/for_testing").palidrome;

test("palidrome of a", () => {
	const result = palidrome("a");
	expect(result).toBe("a");
});

test("palidrome of react", () => {
	const result = palidrome("react");
	expect(result).toBe("tcaer");
});

test("palidrome of saippuakauppias", () => {
	const result = palidrome("saippuakauppias");
	expect(result).toBe("saippuakauppias");
});
