import re

import openai
from server import credits

openai.api_key = credits.api_key

# TODO: finish function and test
def categorize_task(content):
    try:
        # Using GPT to categorize the task
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=(
                "Categorize the following task into on of the following categories: Work, Personal, Study, Other "
                f"Task: {content}"
            ),
            max_tokens=10
        )
        return response.choices[0].text.strip()
    except Exception as e:
        print(f"Error: {e}")
        return "Other"

# basic rule-based priority selector based on words from task content
# TODO: include machine learning
def predict_priority(task_content):
    PRIORITIES = {
        "high": 1,
        "medium": 2,
        "low": 3
    }

    high_priority_keywords = ['urgent', 'asap', 'by', 'deadline', 'important']
    if any(re.search(rf'\b{keyword}\b', task_content, re.IGNORECASE) for keyword in high_priority_keywords):
        return PRIORITIES["high"]
    return PRIORITIES['low']