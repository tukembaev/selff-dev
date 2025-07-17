import React from "react";
import { Textarea } from "shared/shadcn/ui/textarea";
import { H2, H3 } from "shared/shadcn/ui/typography";

const DuelAnswerInput = () => {
  return (
    <div className="mx-auto">
      <H2>Вопрос #1</H2>
      <H3>Столица франции?</H3>
      <Textarea />
    </div>
  );
};

export default DuelAnswerInput;
