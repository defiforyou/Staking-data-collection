import sys

path = sys.argv[1]
f = open(path, "r")
data = f.readlines()

data = sorted(data)
f.close()
f = open(path, "w")

for i in data:
    print(i)
    f.writelines(i)
f.close()


