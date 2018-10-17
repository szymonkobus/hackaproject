class node:
    parent = ""
    child = []
    name = ""

def count_stars(String):
    for i in range(len(String)):
        if(String[i] != '*'):
            return i

def getname(String):
    if(String.find("[[") != String.find("]]")):
        return String[String.find("[[") + 2:String.find("]]")]
    else:
        return ''

# 1. create the structure from data (in python)
source = open('data_tree.txt', 'r')
lines = source.readlines()
for line in lines:
    print(getname(line))

# 2. connect to the database

# 3. put everything there
