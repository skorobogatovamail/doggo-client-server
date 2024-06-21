import { AnswerType, QuestionType } from "@/shared/types";
import React, { useEffect, useRef } from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";


type OneQuestionCardProps = {
  question: QuestionType;
  answer: string;
  handleInputChange: (questionId: number, answer: string) => void;
};

export default function OneQuestionCard({
  question,
  answer,
  handleInputChange,
}: OneQuestionCardProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [question]);

  return (
    <div className="h-full flex items-center justify-start flex-col">
      <h2 className="text-2xl text-center m-2">{question.question}</h2>
      <div className="flex items-center mt-5">
        <input
          ref={inputRef}
          name={`${question.id}`}
          className="myInput"
          placeholder={question.placeholder}
          value={answer}
          onChange={(e) => handleInputChange(question.id, e.target.value)}
        />
        {/* на эту иконку надо навесить логику */}
        <BsArrowRightCircleFill size={40} className="items-center ml-2"/>
      </div>
    </div>
  );
}
