import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {

  const relations = {
    1: { friends: [2, 3, 5, 6, 9], enemies: [8], neutral: [4, 7] },
    2: { friends: [1, 3, 5, 6], enemies: [4, 8, 9], neutral: [7] },
    3: { friends: [1, 2, 5, 7], enemies: [6], neutral: [4, 8, 9] },
    4: { friends: [1, 5, 6, 7], enemies: [2, 4, 8, 9], neutral: [3] },
    5: { friends: [1, 2, 3, 5, 6], enemies: [], neutral: [4, 7, 8, 9] },
    6: { friends: [1, 5, 6, 7], enemies: [3], neutral: [2, 4, 8, 9] },
    7: { friends: [1, 3, 5, 6], enemies: [], neutral: [2, 4, 7, 8, 9] },
    8: { friends: [4, 5, 6], enemies: [1, 2, 9], neutral: [3, 7] },
    9: { friends: [1, 2, 3], enemies: [6, 8], neutral: [4, 5] },
  };

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [showResult, setShowResult] = useState(false);

  const [nameData, setNameData] = useState(null);
  const [dobData, setDobData] = useState(null);
  const [mobileData, setMobileData] = useState(null);

  useEffect(() => {
    document.title =
      "TheCosmicCounselor Numerology Calculator - Astro Vivek Nigam";
  }, []);

  // --- Numerology maps ---
  const pythagoreanMap = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
  };

  const chaldeanMap = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 7, P: 8, Q: 1, R: 2,
    S: 3, T: 4, U: 6, V: 6, W: 6, X: 5, Y: 1, Z: 7
  };

  const meanings = {
    1: { hi: "नेतृत्व, आत्मविश्वास, स्वतंत्रता", en: "Leadership, confidence, independence" },
    2: { hi: "सहयोगी, संवेदनशील, कूटनीतिक", en: "Cooperation, sensitivity, diplomacy" },
    3: { hi: "रचनात्मकता, अभिव्यक्ति, उत्साह", en: "Creativity, expression, enthusiasm" },
    4: { hi: "स्थिरता, मेहनत, संगठन क्षमता", en: "Stability, hard work, organization" },
    5: { hi: "स्वतंत्रता, रोमांच, अनुकूलता", en: "Freedom, adventure, adaptability" },
    6: { hi: "जिम्मेदारी, सेवा, प्रेम", en: "Responsibility, service, love" },
    7: { hi: "आध्यात्मिकता, खोज, गूढ़ ज्ञान", en: "Spirituality, research, mysticism" },
    8: { hi: "महत्वाकांक्षा, कर्मशीलता, भौतिक सफलता", en: "Ambition, discipline, material success" },
    9: { hi: "सेवा भाव, करुणा, मानवीयता", en: "Service, compassion, humanitarianism" }
  };

  const goodPairs = ["15", "51", "17", "71", "19", "91", "25", "52", "29", "92", "37", "73", "38", "83", "47", "74", "57", "75", "35", "53", "36", "63", "39", "93", "59", "95", "67", "76", "69", "96", "78", "87", "89", "98", "11", "33", "55", "66", "99"];
  const badPairs = ["41", "14", "16", "61", "18", "81", "24", "42", "27", "72", "28", "82", "34", "43", "45", "54", "46", "64", "48", "84", "68", "86", "58", "85", "22", "44", "77", "88"];
  const neutralPairs = ["23", "32", "49", "94", "56", "65", "79", "97"];

  // --- Helper functions ---
  function reduceNumber(num) {
    while (num > 9) {
      num = num.toString().split("").reduce((a, b) => a + parseInt(b), 0);
    }
    return num;
  }

  function calculateName(name, system) {
    const map = system === "pythagorean" ? pythagoreanMap : chaldeanMap;
    let sum = 0;
    name.toUpperCase().split("").forEach(ch => { if (map[ch]) sum += map[ch]; });
    return { sum, reduced: reduceNumber(sum) };
  }

  function calculateDOB(dob) {
    if (!dob) return { moolank: null, bhagyank: null };
    const [year, month, day] = dob.split("-").map(n => parseInt(n));
    return { moolank: reduceNumber(day), bhagyank: reduceNumber(year + month + day) };
  }

  // ✅ FIXED checkRelation
  function checkRelation(type, number, mobileSum) {
    const relation = relations[number];
    if (!relation) return `${type} (${number}) → No relation data`;

    if (relation.friends.includes(mobileSum)) {
      return `✅ Mobile is FRIENDLY with your ${type} (${number})`;
    } else if (relation.enemies.includes(mobileSum)) {
      return `❌ Mobile is ENEMY with your ${type} (${number})`;
    } else {
      return `⚪ Mobile is NEUTRAL with your ${type} (${number})`;
    }
  }

  // ✅ Mobile analysis function
  function checkMobile(mobile, moolank, bhagyank) {
    if (!mobile || mobile.length !== 10) return null;

    const digits = mobile.split("").map(d => parseInt(d));
    const sum = digits.reduce((a, b) => a + b, 0);
    const reduced = reduceNumber(sum);

    // Pairs
    const pairs = [];
    for (let i = 0; i < mobile.length - 1; i++) {
      pairs.push(mobile[i] + mobile[i + 1]);
    }
    const foundGood = pairs.filter(p => goodPairs.includes(p));
    const foundBad = pairs.filter(p => badPairs.includes(p));
    const foundNeutral = pairs.filter(p => neutralPairs.includes(p));

    // Relation check
    let matches = [];
    if (moolank) {
      matches.push(checkRelation("Moolank", moolank, reduced));
    }
    if (bhagyank) {
      matches.push(checkRelation("Bhagyank", bhagyank, reduced));
    }

    return {
      sum,
      reduced,
      foundGood,
      foundBad,
      foundNeutral,
      matches,
      needsChange: matches.some(m => m.includes("❌"))
    };
  }

  const handleCalculate = () => {
    const dobResult = calculateDOB(dob);
    const nameResult = {
      first: calculateName(firstName, "pythagorean"),
      middle: calculateName(middleName, "pythagorean"),
      last: calculateName(lastName, "pythagorean"),
      full: calculateName(firstName + middleName + lastName, "pythagorean"),
      firstCh: calculateName(firstName, "chaldean"),
      middleCh: calculateName(middleName, "chaldean"),
      lastCh: calculateName(lastName, "chaldean"),
      fullCh: calculateName(firstName + middleName + lastName, "chaldean")
    };
    const mobileResult = checkMobile(mobile, dobResult.moolank, dobResult.bhagyank);

    setDobData(dobResult);
    setNameData(nameResult);
    setMobileData(mobileResult);
    setShowResult(true);

    // Reset
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setDob("");
    setMobile("");
  };

  const isFormValid = firstName && lastName && dob && mobile;

  return (
    <div className="app-container">
      <div className="calculator-card">
        <div className="header">
          <h1>TheCosmicCounselor Numerology Calculator</h1>
          <p className="font-bold">(Astro Vivek Nigam)</p>
        </div>
        <div className="input-section">
          <input placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
          <input placeholder="Middle Name" value={middleName} onChange={e => setMiddleName(e.target.value)} />
          <input placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
          <input placeholder="DOB" type="date" value={dob} onChange={e => setDob(e.target.value)} />
          <input placeholder="Mobile Number" value={mobile} onChange={e => setMobile(e.target.value)} maxLength={10} />
          <button onClick={handleCalculate} disabled={!isFormValid}>Calculate</button>
        </div>

        {showResult && (
          <div className="result-section">
            <div className="card">
              <h2>Name Numerology</h2>
              <p><strong>Pythagorean:</strong> First {nameData.first.reduced}, Middle {nameData.middle.reduced}, Last {nameData.last.reduced}, Full {nameData.full.reduced}</p>
              <p><strong>Chaldean:</strong> First {nameData.firstCh.reduced}, Middle {nameData.middleCh.reduced}, Last {nameData.lastCh.reduced}, Full {nameData.fullCh.reduced}</p>
            </div>

            <div className="card">
              <h2>DOB Analysis</h2>
              {dobData.moolank && <p><strong>मूलांक:</strong> {dobData.moolank} – {meanings[dobData.moolank]?.hi} | {meanings[dobData.moolank]?.en}</p>}
              {dobData.bhagyank && <p><strong>भाग्यांक:</strong> {dobData.bhagyank} – {meanings[dobData.bhagyank]?.hi} | {meanings[dobData.bhagyank]?.en}</p>}
            </div>

            <div className="card">
              <h2>Mobile Number Analysis</h2>
              {mobileData ? <>
                <p><strong>Digit Sum:</strong> {mobileData.sum} → {mobileData.reduced}</p>
                <p className="positive"><strong>Positive Pairs: </strong> {mobileData.foundGood.join(", ") || "None"}</p>
                <p className="negative"><strong>Negative Pairs:</strong> {mobileData.foundBad.join(", ") || "None"}</p>
                <p className="neutral"><strong>Neutral Pairs:</strong> {mobileData.foundNeutral.join(", ") || "None"}</p>

                <div className="dob-compare">
                  {mobileData.matches.map((m, i) => (
                    <p key={i} className={
                      m.includes("✅") ? "positive" :
                        m.includes("❌") ? "negative" : "neutral"
                    }>{m}</p>
                  ))}
                </div>

                <p className="alert">⚠️ मोबाइल नम्बर रखने या बदलने के लिये किसी एक्सपर्ट से सलाह लें।</p>
              </> : <p className="alert">Please enter valid 10-digit number</p>}
            </div>

            <div className="card">
              <p className="text-cyan-700 font-bold">अधिक जानकारी के लिये सम्पर्क करें:
                न्युमेरोलॉजिस्ट / एस्ट्रोलॉजर विवेक निगम</p>
              <p>मो० :<strong className="text-cyan-600 font-semibold"> +91 9450122288 , +91 8299037227</strong></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
