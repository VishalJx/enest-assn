import React, { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";

const FilterCourseSidebar = ({ onFilterChange }) => {
  const [entranceExam, setEntranceExam] = useState("all");
  const [competitiveExam, setCompetitiveExam] = useState("all");

  const handleEntranceExamChange = (value) => {
    setEntranceExam(value);
    onFilterChange({ entranceExam: value, competitiveExam });
  };

  const handleCompetitiveExamChange = (value) => {
    setCompetitiveExam(value);
    onFilterChange({ entranceExam, competitiveExam: value });
  };

  return (
    <div className="w-[17rem] h-[85vh] border rounded-3xl bg-white">
      <h2 className="font-bold mb-4 pt-4 flex items-center justify-center">
        <HiMiniAdjustmentsHorizontal className="mr-1" />
        <p>Filter Course</p>
      </h2>
      <hr />
      <Accordion type="multiple" defaultValue={["entrance-exam", "competitive-exam"]} className="flex flex-col items-center">
        {/* Entrance Exam Section */}
        <AccordionItem value="entrance-exam">
          <AccordionTrigger className="font-bold">Entrance Exam</AccordionTrigger>
          <AccordionContent>
            <RadioGroup value={entranceExam} onValueChange={handleEntranceExamChange}>
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem
                  id="all-entrance"
                  value="all"
                  className="w-4 h-4 border-2 border-gray-400 rounded-full checked:bg-purple-600 checked:border-purple-600"
                />
                <label htmlFor="all-entrance" className="text-sm font-medium">
                  All Exams
                </label>
              </div>
              {["CFTRI", "GATE", "CUET", "UGC NET", "NIN", "ICAR", "MBA (GDPI)"].map((exam) => (
                <div className="flex items-center space-x-2 mb-2" key={exam}>
                  <RadioGroupItem
                    id={exam}
                    value={exam.toLowerCase()}
                    className="w-4 h-4 border-2 border-gray-400 rounded-full checked:bg-purple-600 checked:border-purple-600"
                  />
                  <label htmlFor={exam} className="text-sm font-medium">
                    {exam}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        {/* Competitive Exam Section */}
        <AccordionItem value="competitive-exam" className="mt-3">
          <AccordionTrigger className="font-bold">Competitive Exams</AccordionTrigger>
          <AccordionContent>
            <RadioGroup value={competitiveExam} onValueChange={handleCompetitiveExamChange}>
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem
                  id="all-competitive"
                  value="all"
                  className="w-4 h-4 border-2 border-gray-400 rounded-full checked:bg-purple-600 checked:border-purple-600"
                />
                <label htmlFor="all-competitive" className="text-sm font-medium">
                  All Exams
                </label>
              </div>
              {["JAE-SFA", "CGPDTM", "CFSO", "FCI"].map((exam) => (
                <div className="flex items-center space-x-2 mb-2" key={exam}>
                  <RadioGroupItem
                    id={exam}
                    value={exam.toLowerCase()}
                    className="w-4 h-4 border-2 border-gray-400 rounded-full checked:bg-purple-600 checked:border-purple-600"
                  />
                  <label htmlFor={exam} className="text-sm font-medium">
                    {exam}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FilterCourseSidebar;
