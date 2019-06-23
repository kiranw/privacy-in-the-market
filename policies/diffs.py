import os
import re
import subprocess
import json
import codecs
import lxml.html
import difflib
import sys
from bs4 import BeautifulSoup
import os.path
from os import path




def read_file(company,year):
	file_2 = company+"_"+str(int(year)+1)+".html"
	file_1 = company+"_"+str(year)+".html"
	if (path.exists(file_2) and path.exists(file_1)):
		url2018 = codecs.open(file_2,'r','utf-8').read()
		url2017 = codecs.open(file_1,'r','utf-8').read()
		soup2018 = BeautifulSoup(url2018, from_encoding="utf-8").get_text()
		soup2017 = BeautifulSoup(url2017, from_encoding="utf-8").get_text()

		to_file = soup2018.split('\n')
		from_file = soup2017.split("\n")

		Html_file = open(company+"_"+str(year)+"_processed.html",'w')
		Html_file.write(difflib.HtmlDiff().make_file(from_file, to_file).encode('utf-8'))


companies = ["apple","google","facebook","twitter","amazon","microsoft"]
years = range(2014,2020)
for c in companies:
    for y in years:
    	if y<2019:
    		read_file(c,y)

