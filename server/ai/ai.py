import re
import openai
import os

openai.api_key =  os.getenv('API_KEY')

# Task's group selection based on its content
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

# Rule-based priority selector based on words from task content
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