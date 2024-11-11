import os
import json

def find_all_occurrences(text, substring):
    """Find all the start indices of a substring in a given text."""
    if not substring:  # Handle empty string or None
        return [0]
    
    start_indices = []
    start = text.find(substring)
    while start != -1:
        start_indices.append(start)
        start = text.find(substring, start + 1)
    return start_indices

def update_answer_starts(json_file_path):
    # Kiểm tra nếu đường dẫn hợp lệ
    if not os.path.isfile(json_file_path):
        print(f"File không tồn tại: {json_file_path}")
        return

    # Load the JSON data
    try:
        with open(json_file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
    except json.JSONDecodeError as e:
        print(f"Lỗi khi đọc file JSON: {e}")
        return

    # Iterate over the data to update "answer_start"
    for item in data.get('data', []):
        context = item.get('context', '')
        
        for qa in item.get('qas', []):
            answer_text = qa['answers'][0].get('text', '')
            start_indices = find_all_occurrences(context, answer_text)
            
            # Update answer_start
            qa['answers'][0]['answer_start'] = start_indices if start_indices else None

    # Save the modified JSON to a new file
    input_filename = os.path.basename(json_file_path).replace('.json', '')
    output_filename = f"{input_filename}_update_index.json"
    output_file_path = os.path.join(os.path.dirname(json_file_path), output_filename)
    
    with open(output_file_path, 'w', encoding='utf-8') as outfile:
        json.dump(data, outfile, indent=2)

    print(f"Updated JSON file created: {output_file_path}")

# Example usage
json_file_path = input("Nhập đường dẫn file JSON: ").strip()
update_answer_starts(json_file_path)
