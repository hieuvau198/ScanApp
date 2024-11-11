def format_to_single_line(text):
    # Remove newlines and extra spaces
    single_line = " ".join(text.split())
    return single_line

# Example usage
text = """
KOMODO LOGISTICS CO., LTD
11 JALAN MANGGA, SURABAYA, 60232,
INDONESIA



"""

formatted_text = format_to_single_line(text)
print(formatted_text)