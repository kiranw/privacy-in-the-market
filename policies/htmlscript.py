import codecs
from bs4 import BeautifulSoup
import readtime
import re
import mechanize
import nltk
from html2text import html2text
import lxml
from lxml.html.clean import Cleaner
import os.path
from os import path





companies = ["apple","microsoft","google","facebook","twitter","amazon"]
years = range(2014,2020)
for c in companies:
    for y in years:
        filename = c+"_"+str(y)+".html"
        if (path.exists(filename)):
            file = codecs.open(filename,'r','utf-8')
            document = BeautifulSoup(file.read()).get_text()
            readtime_result = readtime.of_text(document)
            cleaned_html_file = clean_html(document)
            corpus_arr = word_count(cleaned_html_file)
            word_count = len(corpus_arr)
            print(readtime_result)
            print("The total word count is: ", word_count)



def clean_html(html):

    # remove javascript
    cleaned = re.sub(r"(?is)<(script|style).*?>.*?(</\1>)", "", html.strip())
    cleaned = re.sub(r"<script[\d\D]*?>[\d\D]*?</script>","",cleaned)

    # remove html comments
    cleaned = re.sub(r"(?s)<!--(.*?)-->[\n]?", "", cleaned)

    # remove miscellaneous tags
    cleaned = re.sub(r"(?s)<.*?>", " ", cleaned)

    # remove whitespace
    cleaned = re.sub(r"&nbsp;", " ", cleaned)
    cleaned = re.sub(r"  ", " ", cleaned)
    cleaned = re.sub(r"  ", " ", cleaned)
    cleaned = cleaned.rstrip()

    return cleaned.strip()

def word_count(document):
	tokens = document.strip().split(" ")
	clean_tokens = [t for t in tokens if re.match(r'[^\W\d]*$', t)]
	clean_tokens = [t for t in clean_tokens if len(t)>0]
	return clean_tokens

file = codecs.open("AdobePrivacy.html",'r','utf-8')
document = BeautifulSoup(file.read()).get_text()

# readtime_result = readtime.of_text(document)
# cleaned_html_file = clean_html(document)
# corpus_arr = word_count(cleaned_html_file)
# word_count = len(corpus_arr)


# print(readtime_result)
# print("The total word count is: ", word_count)


