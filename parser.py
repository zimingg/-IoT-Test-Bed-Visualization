class node:
    def __init__(self, name):
        self.name = name
        self.root = False
    def __str__(self):
        return "Node name is {}. {} root".format(self.name,self.root)

class link:
    def __init__(self, start, to):
        self.start = start
        self.to = to
        self.messageID = "None"
    def __str__(self):
        return "ID is {}, from {} to {} ".format(self.MessageID, self.start, self.to)



new_nodes = []
old_nodes = []
new_links = []
old_links = []
difference = {"delete/add/change": "value"}



f = open('output.txt', 'r')
line = f.readline()
while(line!=""):
    
    
    l = line.split(" ")
    
    for i in l:
        if (i == "All"):
            
            old_nodes = new_nodes
            old_links = new_links
            print("=====================\n")
            print("====== New Page =====\n")
            print("=====================\n")
            print("current nodes: \n")
            for i in old_nodes:
                print("node: {} \n".format(i))
            print("current links:  \n")
            for i in old_links:
                print("link: {} \n".format(i))
            new_nodes = []
            new_links = []
            
            
            count = 0
            while(1):
                count+=1
                line = f.readline()
                l = line.split(" ")
                if l[0] == "":
                    break
                else:
                    if len(l) == 1:
                        the_node = node(l[0][0:-1])
                        if count == 1:
                            the_node.root = True
                        new_nodes.append(the_node)


    if (l[0] == "Link"):
        the_link = link(l[2], l[4])
        #new_links.append(the_link)
        line = f.readline()
        l = line.split(" ")
        the_link.MessageID = l[0][0:-1]
        
        while(1):
            line = f.readline()
            l = line.split(" ")
            if l[0] == "":
                break
            else:
                for i in l:
                    if i == "Success," :
                        new_links.append(the_link)


    else:
        line = f.readline()















