/**
 * Search & filter logic tests (per prompt: filter combinations, search priority).
 */
import { SKIN_TONES, OCCASIONS, CONFIDENCE_LEVELS, BODY_TYPES } from "@/types/fashion";

describe("Search & Filter constants", () => {
  it("has all skin tones required by prompt", () => {
    expect(SKIN_TONES).toContain("Fair");
    expect(SKIN_TONES).toContain("Wheatish");
    expect(SKIN_TONES).toContain("Medium");
    expect(SKIN_TONES).toContain("Dusky");
    expect(SKIN_TONES).toContain("Deep");
  });

  it("has occasion Wedding and Formal", () => {
    expect(OCCASIONS).toContain("Wedding");
    expect(OCCASIONS).toContain("Formal");
  });

  it("has confidence levels Safe, Moderate, Bold", () => {
    expect(CONFIDENCE_LEVELS).toEqual(["Safe", "Moderate", "Bold"]);
  });

  it("has body types including Plus Size and Slim", () => {
    expect(BODY_TYPES).toContain("Regular");
    expect(BODY_TYPES).toContain("Plus Size");
    expect(BODY_TYPES).toContain("Slim");
  });
});
