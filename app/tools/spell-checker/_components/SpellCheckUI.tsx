"use client";

import { useState } from "react";
import { Textarea } from "../../../components/ui";
import { Button } from "../../../components/ui";

const SpellCheckUI = () => {
  const [text, setText] = useState("");
  const [corrections, setCorrections] = useState<any[]>([]);

  const checkSpelling = () => {
    const commonMisspellings = [
      { wrong: "teh", correct: "the" },
      { wrong: "recieve", correct: "receive" },
      { wrong: "occured", correct: "occurred" },
    ];

    const found = commonMisspellings.filter(item =>
      text.toLowerCase().includes(item.wrong)
    );

    setCorrections(found);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6" >
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to check spelling..."
        className="mb-4 min-h-[300px]"
      />

      <Button onClick={checkSpelling} disabled={!text}>
        Check Spelling
      </Button>

      {
        corrections.length > 0 && (
          <div className="mt-4" >
            <h3 className="mb-2 font-semibold" > Spelling Issues Found: </h3>
            {
              corrections.map((item, idx) => (
                <div key={idx} className="rounded bg-red-50 p-3 mb-2" >
                  <span className="text-red-600" > {item.wrong} </span> →
                  < span className="text-green-600 ml-2" > {item.correct} </span>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  );
};

export default SpellCheckUI;