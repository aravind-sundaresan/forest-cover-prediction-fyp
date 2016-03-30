import sys
import numpy as np
from sklearn import preprocessing
from sklearn.ensemble import RandomForestClassifier

dataset = np.loadtxt("normalized.csv", delimiter=",")

train_X = dataset[1:10000,0:10]
train_Y = dataset[1:10000,10]

#print train_Y

test_X = []
test_another = []
#print sys.argv

for arg in sys.argv[1:11]:
	test_another.append(float(arg))
	#print arg
	# test_X = np.append(test_X,int(arg))


# print test_X
#print test_another
test_XX = [test_another]
#print test_XX

test_X = np.array(test_XX)
#print test_X

train_normalized_X = preprocessing.normalize(train_X)

train_standardized_X = preprocessing.scale(train_X)

model = RandomForestClassifier(n_estimators=200)
model.fit(train_X,train_Y)

prediction = model.predict(test_X)

print prediction

#cmdargs = str(sys.argv)

#print ("Args List: %s" % cmdargs)












