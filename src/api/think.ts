export const directionNames = ["up", "down", "left", "right"] as const;
export type DirectionName = (typeof directionNames)[number];

export const waitChoices = ["1", "2-3", "4-9", "10+"] as const;
export type WaitChoice = (typeof waitChoices)[number];

export type ThinkRequest = {
  prompt: string;
};

export type ThinkAnswer = {
  input: { choice: DirectionName };
  for: { choice: WaitChoice };
  next_input: { choice: DirectionName };
};

export type ThinkResponse = {
  model: string;
  answers: ThinkAnswer;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
};

function isDirectionName(value: unknown): value is DirectionName {
  return typeof value === "string" && (directionNames as readonly string[]).includes(value);
}

function isWaitChoice(value: unknown): value is WaitChoice {
  return typeof value === "string" && (waitChoices as readonly string[]).includes(value);
}

export function isThinkRequest(value: unknown): value is ThinkRequest {
  if (typeof value !== "object" || value === null || !("prompt" in value)) {
    return false;
  }

  const prompt = (value as { prompt: unknown }).prompt;
  return typeof prompt === "string" && prompt.trim().length > 0;
}

export function isThinkResponse(value: unknown): value is ThinkResponse {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const response = value as Partial<ThinkResponse>;
  const answers = response.answers;
  const usage = response.usage;

  return typeof response.model === "string" &&
    typeof answers === "object" && answers !== null &&
    isDirectionName(answers.input?.choice) &&
    isWaitChoice(answers.for?.choice) &&
    isDirectionName(answers.next_input?.choice) &&
    typeof usage === "object" && usage !== null &&
    typeof usage.input_tokens === "number" &&
    typeof usage.output_tokens === "number";
}
