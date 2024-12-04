import openai

# TODO: Add OpenAI API key
openai.api_key = 'your-api-key'

# TODO: finish function and test
def categorize_task(content):
    # Using GPT to categorize the task
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=f"Categorize the following task: {content}",
        max_tokens=10
    )
    return response.choices[0].text.strip()

PRIORITIES = {
    "high": "High",
    "medium": "Medium",
    "low": "-"
}

# basic rule-based priority selector based on words from task content
# TODO: include machine learning
def predict_priority(task_content):
    high_priority_keywords = ['urgent', 'asap', 'by', 'deadline', 'important']
    if any(keyword in task_content for keyword in high_priority_keywords):
        return PRIORITIES["high"]
    return PRIORITIES['low']