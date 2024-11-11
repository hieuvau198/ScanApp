import json

def format_to_json(file_path):
    # Read text from the file and convert it to a single line
    with open(file_path, 'r') as file:
        text = " ".join(file.read().split())

    # Prepare the JSON structure
    data = {
        "data": [
            {
                "context": text,
                "qas": [
                    {"id": "00001", "question": "Who is the Shipper?", "answers": [{"text": "", "answer_start": ""}], "is_impossible": False},
                    {"id": "00002", "question": "Who is the Consignee?", "answers": [{"text": "", "answer_start": ""}], "is_impossible": False},
                    {"id": "00003", "question": "Who is the Notify Party?", "answers": [{"text": "", "answer_start": ""}], "is_impossible": False},
                    {"id": "00004", "question": "What is the Gross Weight of the shipment?", "answers": [{"text": "", "answer_start": ""}], "is_impossible": False},
                    {"id": "00005", "question": "What is the unit of Gross Weight?", "answers": [{"text": "", "answer_start": ""}], "is_impossible": False},
                    {"id": "00006", "question": "What is the Port of Lading?", "answers": [{"text": "", "answer_start": ""}], "is_impossible": False},
                    {"id": "00007", "question": "What is the Place of Delivery?", "answers": [{"text": "", "answer_start": ""}], "is_impossible": False},
                    {"id": "00008", "question": "What is the dimension or tonnage?", "answers": [{"text": "", "answer_start": ""}], "is_impossible": False},
                    {"id": "00009", "question": "What is the Bill of Lading Number?", "answers": [{"text": "", "answer_start": ""}], "is_impossible": False},
                    {"id": "00010", "question": "What is the Place and Date of Issue?", "answers": [{"text": "", "answer_start": ""}], "is_impossible": False},
                    {"id": "00011", "question": "What is the Container Number?", "answers": [{"text": "", "answer_start": ""}], "is_impossible": False},
                    {"id": "00012", "question": "What is the Seal Number?", "answers": [{"text": "", "answer_start": ""}], "is_impossible": False},
                    {"id": "00013", "question": "What is the Number of Packages?", "answers": [{"text": "", "answer_start": ""}], "is_impossible": False},
                    {"id": "00014", "question": "What is the Kind of Packages?", "answers": [{"text": "", "answer_start": ""}], "is_impossible": False},
                    {"id": "00015", "question": "What is the Port of Discharge?", "answers": [{"text": "", "answer_start": ""}], "is_impossible": False},
                    {"id": "00016", "question": "What is the Part of Dry Container STC?", "answers": [{"text": "", "answer_start": ""}], "is_impossible": False}
                ]
            }
        ]
    }

    # Save as JSON with the same name as the txt file
    output_file = file_path.replace(".txt", ".json")
    with open(output_file, 'w') as json_file:
        json.dump(data, json_file, indent=2)

    print(f"JSON file saved as: {output_file}")
# Get file path from console
file_path = input("Enter the path to the text file: ").strip('"')
format_to_json(file_path)