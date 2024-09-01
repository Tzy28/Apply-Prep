import os
from io import BytesIO

import PyPDF2
import markdown
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from openai import OpenAI
import PyPDF2


app = Flask(__name__)
CORS(app)
# Set your OpenAI API key here
client = OpenAI(
    api_key='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'
)

# Route for the main page
@app.route('/')
def index():
    return jsonify({'message': 'Welcome to Easy Apply'})


# Route for creating a Personal Statement from scratch
@app.route('/ps_create', methods=['POST'])
def ps_create():
    data = request.json

    additional_education_details = ', '.join(
        [f"{edu['degree']} in {edu['program']} from {edu['institution']}" for edu in data['additional_education']]
    )

    prompt = (
        f"Write a personal statement for a student applying for a {data['degree']} "
        f"in {data['program']} at {data['institution_applying']}. The student currently studies {data['current_degree']} in {data['current_program']} at {data['institution']}. "
        f"Additional education history: {additional_education_details}. "
        f"Internship experience: {data['internship']}. Research experience: {data['research']}. "
        f"Other requirements: {data['other_requirements']}. "
        f"Word count: {data['word_count']}."
        f"The statement should be broken into paragraphs according to the content."
        f"Do not make up any experiences or qualifications that the applicant don't have."
        f"\n\nThe statement should be broken into multiple paragraphs, with each main idea starting a new paragraph."
    )

    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}]
        )
        generated_ps = response.choices[0].message.content.strip()
        return jsonify({'personal_statement': generated_ps})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Route for polishing a Personal Statement
@app.route('/ps_polish', methods=['POST'])
def ps_polish():
    data = request.json
    personal_statement = data.get('personal_statement', '')
    comment = data.get('comments', '')
    prompt = (
        f"Please polish the following personal statement, improving its clarity, style, and grammar without changing the meaning:\n\n"
        f"{personal_statement}\n\n"
        f"Make sure the language is formal, professional, and persuasive. Keep the content structured logically, and ensure that it maintains the original intent."
        f"\n\n And adopt these comments: {comment}"
        f"\n\nThe statement should be broken into multiple paragraphs, with each main idea starting a new paragraph."
    )

    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}]
        )
        polished_ps = response.choices[0].message.content.strip()
        return jsonify({'polished_personal_statement': polished_ps})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Route to generate the resume
@app.route('/generate_resume', methods=['POST'])
def generate_resume():
    print('In Development')


# Route to polish the resume
@app.route('/resume_polish', methods=['POST'])
def resume_polish():
    try:
        # Check if a file is part of the request
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400

        file = request.files['file']

        # Ensure it's a PDF file
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        if not file.filename.lower().endswith('.pdf'):
            return jsonify({'error': 'File is not a PDF'}), 400

        # Read the PDF content
        reader = PyPDF2.PdfReader(file)
        text = ''
        for page in range(len(reader.pages)):
            text += reader.pages[page].extract_text()


        print(text)
        # Prepare the prompt for OpenAI
        prompt = (
            f"Please polish the following resume content, improving its clarity, style, and grammar while keeping the original meaning intact.\n\n"
            f"{text}\n\n"
            f"Make sure the language is formal and professional, with a focus on making the experience sections more impactful by following the STAR method "
            f"(Situation, Task, Action, Result)."
            f"Which means that for each experience, use at least 4 sentences, directly start with verbs and use strong verbs."
            f"Do not remove any content nor sections in the resume, you can only polish the experience sections."
        )

        # Make a request to OpenAI
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}]
        )

        polished_resume = response.choices[0].message.content.strip()
        return jsonify({'polished_resume': polished_resume})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/school_selection', methods=['POST'])
def school_selection():
    try:
        # Retrieve the submitted data from the request
        data = request.json
        degree = data.get('degree', '')
        program = data.get('program', '')
        preferred_region = data.get('preferredRegion', '')
        current_education = data.get('currentEducation', {})
        past_education = data.get('pastEducation', [])
        internships = data.get('internships', '')
        researches = data.get('researches', '')

        # Collecting details to create a comprehensive prompt
        education_details = (
            f"Current Education:\n"
            f"Degree: {current_education.get('degree', '')}, Program: {current_education.get('program', '')}, "
            f"Institution: {current_education.get('institution', '')}, GPA: {current_education.get('gpa', '')}\n"
        )
        for edu in past_education:
            education_details += (
                f"Past Education:\n"
                f"Degree: {edu.get('degree', '')}, Program: {edu.get('program', '')}, "
                f"Institution: {edu.get('institution', '')}, GPA: {edu.get('gpa', '')}\n"
            )

        # Prepare the prompt for OpenAI
        prompt = (
            f"Based on the following student's profile, suggest 20 schools for applying with a mixture of reach, "
            f"target, and safety schools. Each suggested school should be formatted as:\n\n"
            f"School Name | School Overall Ranking / Program Ranking | Program Name | Location | Tuition | Program Link\n\n"
            f"Profile Details:\n"
            f"Degree Applying For: {degree}\n"
            f"Program Applying For: {program}\n"
            f"Preferred Region/Country: {preferred_region}\n"
            f"{education_details}\n"
            f"Internship Experience: {internships}\n"
            f"Research Experience: {researches}\n\n"
            f"Use USNews rankings for U.S. schools and QS rankings for other countries. Rank schools based on the profile, "
            f"prioritizing high-ranking schools but balancing with options that fit the student's background as reach, target (focus on this range), "
            f"and safety schools (Don't be too conservative)."
            f"Strictly follow the output format provided above, and directly give me the list"
            f"Sample Output:\n"
            f"XX University | Overall Rank # / Program Rank # | Program Name | Location | Tuition | [Program Link](https://program-link.com)\n\n"
            f"Don't put empty lines between lines"
            f"Must ensure the link provided is a valid link to the program page."
        )

        # Request OpenAI to generate the school selection suggestions
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}]
        )

        school_suggestions = response.choices[0].message.content.strip()
        return jsonify({'school_suggestions': school_suggestions})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
