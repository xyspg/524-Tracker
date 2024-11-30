import requests
from bs4 import BeautifulSoup
import json

with open('card.html', 'r') as f:
    html_content = f.read()


# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(html_content, 'html.parser')

# Find all the card images (based on the HTML structure you provided)
cards = []

# Loop through all nodes that contain the card information
for node in soup.find_all('div', class_='Node-outer'):
    # Try to extract the card name and image URL
    card_name = None
    image_url = None
    

    # Check for the image URL
    image_tag = node.find('a', class_='node-inline-item node-inline-image')
    if image_tag:
        image_url = image_tag.get('href')
        card_name = image_tag.get('title')
    
    if card_name and image_url:
        # Prepare the slug (simplified version of card name)
        slug = card_name.lower().replace(' ', '-')
        
        # Add card information to the list
        cards.append({
            "label": card_name,
            "value": slug,
            "imageUrl": image_url
        })

# Convert the cards list to JSON format
json_output = json.dumps(cards, indent=4)

# Print the output or save it to a file
print(json_output)

# Optionally, write the JSON output to a file
with open("cards.json", "w") as f:
    f.write(json_output)
