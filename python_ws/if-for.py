a = 10

if a == 10:
    print('a is 10')
elif a == 5:
    print('a is 5')
else:
    print('a is not 10')

print()

i = 0
while i == 20:
    i += 1
    print(i)

for i in range(10):
    print(i)
print()

arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
arr2 = list(range(10))

if arr == arr2:
    print('arr is same as arr2')

for x in range(1, 10):
    for y in range(1, 10):
        print(f'{x*y:4}', end='')
    print()