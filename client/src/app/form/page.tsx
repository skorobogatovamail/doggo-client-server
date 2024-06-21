"use client";

import OneQuestionCard from "@/components/OneQuestionCard";
import { AnswerType, QuestionType } from "@/shared/types";
import React, { useEffect, useState } from "react";

export default function Form() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [answers, setAnswers] = useState<AnswerType[]>([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [maxQuestions, setMaxQuestions] = useState(1);

  useEffect(() => {
    setQuestions([
      {
        question: "What's your dog name?",
        id: 1,
        placeholder: "Jack"
      },
      {
        question: "How old are you?",
        id: 2,
        placeholder: "sweet 60"
      },
      {
        question: "Is God a woman?",
        id: 3,
        placeholder: "yeees, queen"
      },
      {
        question: "Will you marry me? very very long question, so long you can't even read it girls and boys",
        id: 4,
        placeholder: "nope"
      },
    ]);
  }, []);

  useEffect(() => {
    setMaxQuestions(questions.length)
  }, [questions])

  const handleNext = () => {
    setCurrentQuestion((prev) => prev+1)
  }

  const handlePrevious = () => {
    setCurrentQuestion((prev) => prev -1 )
  }

  // cюда нужно будет добавить логику с userId
  const handleInputChange = (questionId: number, answer: string) => {
    setAnswers((prev) => {
      // проверяем есть ли ответ в форме
      const existIndex = prev.findIndex((el) => el.questionId === questionId);
      // да есть — перезаписываем
      if (existIndex > -1) {
        const updatedAnswers = [...prev];
        updatedAnswers[existIndex] = { ...updatedAnswers[existIndex], answer };
        return updatedAnswers;
      }
      // нет — просто добавляем
      return [...prev, { questionId, answer }];
    });
  }

  // логика отправки ответа здесь
  const submitHandler = () => {
    if (answers.length !== maxQuestions){
      console.log('Need to answer all questions!')
    } else {
      console.log(answers)
    }
  }


  if (questions.length === 0) return;

  return (
    <div className="h-screen flex items-center flex-col">
        <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${((currentQuestion+1)/maxQuestions)*100}%` }}/>
        </div>
      <div className="w-full flex justify-between">
      {currentQuestion !==0 ? <button className="navigate" onClick={handlePrevious}>previous</button> : <div className="w-50"/>}
      {(currentQuestion + 1) !== maxQuestions ? <button className="navigate" onClick={handleNext}>next</button> : <button className="navigate submit" onClick={submitHandler}>submit</button>}
      </div>
      <OneQuestionCard question={questions[currentQuestion]} answer={answers.find(a => a.questionId === questions[currentQuestion].id)?.answer || ''} handleInputChange={handleInputChange}/>
    </div>
  );
}
