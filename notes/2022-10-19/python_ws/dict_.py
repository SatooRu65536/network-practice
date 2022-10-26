def get_dict():
    return {
        "key1": 123,
        "key2": 456
    }


if __name__ == '__main__':
    ret = get_dict()
    print(ret)
    print(ret.keys())

    for key in ret:
        print(key)

    print(ret['key1'])