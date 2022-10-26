import random

# def get_list(num):
#     ret = []
#     for i in range(num):
#         ret.append(random.randint(0, 100))
    
#     return ret

def get_list(num):
    return [random.randint(0, 100) for i in range(10)]

def get_tupple(num):
    return (random.randint(0, 100) for i in range(10))

if __name__ == '__main__':
    arr = get_list(10)
    print(arr)
    arr[0] = 999
    print(arr)
    # 配列は上書きできる

    tup = get_tupple(10)
    print(tup)
    # tup[0]    # エラー
    # タプルは上書きできない