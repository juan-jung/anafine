import csv
final_file_path = 'res/hospital/merged/merged_hospital_price.csv'



with open(final_file_path, 'r', newline='', encoding='utf-8') as f_in:
            reader = csv.reader(f_in, delimiter='|')
            
            #첫 줄에서 ykiho, npayCd, curAmt 의 index를 찾는다.
            headers = next(reader)
            ykiho_index = headers.index('ykiho')
            npayCd_index = headers.index('npayCd')
            curAmt_index = headers.index('curAmt')
            
            #두 번째 줄부터 ykiho, npayCd, curAmt를 읽어서 저장한다
            ykiho_list = []
            npayCd_list = []
            curAmt_list = []
            for row in reader:
                ykiho_list.append(row[ykiho_index])
                npayCd_list.append(row[npayCd_index])
                curAmt_list.append(row[curAmt_index])
            