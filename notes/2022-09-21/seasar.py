# 文字コードでこねこねできそ
# 
letter_list = list("abcdefghijklmnopqrstuvwxyz")
other_letter_list = list(" .,'")
tmp_letter_list = letter_list + other_letter_list

text = input('暗号文を入力\n >').lower()

text_list = list(text)
text2num_list = [tmp_letter_list.index(t) for t in text_list if t in tmp_letter_list]

print()
for i in range(25):
    tmp = letter_list.pop(0)
    letter_list.append(tmp)
    tmp_letter_list = letter_list + other_letter_list

    output_list = [tmp_letter_list[n] for n in text2num_list]
    output_list = "".join(output_list)
    print(i+1, output_list)