import pymongo

class node:
    def __init__(self, _name):
        self.name = _name
        self.parent = ""
        self.child = []

    def show(self):
        print("name : ",self.name)
        print("parent : ", self.parent)
        print("children : ")
        for c in self.child:
            print(c)
        print("")

def format_name(_node):
    i = _node.name.find("|")
    if(i != -1):
        _node.name = _node.name[:i]
    if(_node.name == "Other"):
        _node.name = "Other: " + _node.parent

def count_stars(line):
    for i in range(len(line)):
        if(line[i] != '*'):
            return i

def get_name(line):
    if(line.find("[[") != line.find("]]")):
        return line[line.find("[[") + 2:line.find("]]")]
    else:
        return ''

def get_group(line):
    place = line.find("group")
    if(place == -1):
        return -1
    else:
        off = 5
        c = line[place + off]
        s = ""
        while(c.isdigit()):
            s += c
            off += 1
            c = line[place + off]
        if(s == ""):
            return -1
        return int(s)

def get_group_name(line):
    if(line[line.find("=") + 2] == "["):
        return get_name(line)
    else:
        return line[line.find("=") + 2:-1]

# 1. create the structure from data (in python)
node_list = []

node_root = []
depth_n =[0]
stars = [0]

source = open('data_tree.txt', 'r')
lines = source.readlines()
for line in lines:
    #parser
    g = get_group(line)
    d_depth = 0
    name = ""
    if( g != -1 ):                              #group line
        if(depth_n[len(depth_n) - 1] + 1!= g):
            if(g == 1):                         #nested group
                d_depth = 1
                depth_n.append(g)
                stars.append(0)
            else:                               #end of group
                d_depth = - 1 - stars[len(stars) - 1]
                depth_n.pop()
                depth_n[len(depth_n) - 1] += 1
                stars.pop()
        else:                                   #pararel group
            d_depth = -stars[len(stars) - 1]
            depth_n[len(depth_n) - 1] += 1
            stars.pop()
            stars.append(0)
        name = get_group_name(line)
    else:
        name = get_name(line)                    #normal line
        if(name != ""):
            d_depth = count_stars(line) - stars[len(stars) - 1]
            stars[len(stars) - 1] = count_stars(line)

    #crating data structure
    if(name != ""):
        temp = node(name)
        for i in range(- d_depth + 1):
            if(len(node_root) != 0):
                node_root.pop()
        l = len(node_root)
        if(l != 0):
            temp.parent = node_root[l-1].name
            node_root[l-1].child.append(name)
        format_name(temp)
        node_root.append(temp)
        node_list.append(temp)


#2. Connect to mongoDB
m_client = pymongo.MongoClient("mongodb+srv://admin:admin123@cluster0-tyvbl.gcp.mongodb.net/ver1")
m_db = m_client["ver1"]         #database
m_col = m_db["technologies"]    #collection

#3. insert techinologies to database
for tech in node_list:
    dic = { "name" : tech.name,
            "parent" : tech.parent,
            "children" : tech.child,
            "articles" : [],
            "discussions" : []
            }
    m_col.insert_one(dic)
