function calculateBMI() {
  const weight = document.getElementById('weight').value;
  const height = document.getElementById('height').value / 100; // Convert height to meters
  const bmi = weight / (height * height);

  let bmiCategory, tips;
  if (bmi < 18.5) {
    bmiCategory = 'Underweight';
    tips = generateTips('underweight');
  } else if (bmi >= 18.5 && bmi < 25) {
    bmiCategory = 'Normal';
    tips = generateTips('normal');
  } else if (bmi >= 25 && bmi < 30) {
    bmiCategory = 'Overweight';
    tips = generateTips('overweight');
  } else {
    bmiCategory = 'Obese';
    tips = generateTips('obese');
  }

  const bmiResultElement = document.getElementById('bmi-result');
  bmiResultElement.innerHTML = `Your BMI is ${bmi.toFixed(2)}, which is considered ${bmiCategory}.`;

  const tipsElement = document.getElementById('tips');
  tipsElement.innerHTML = `Tips: ${tips}`;
}

async function generateTips(category) {
  const apiKey = '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';
  const prompt = `Provide 3 personalized tips for a person who is ${category} based on their BMI.`;

  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.7
    })
  });

  const data = await response.json();
  return data.choices[0].text.trim();
}
