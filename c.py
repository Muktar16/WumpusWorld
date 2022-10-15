import pandas as pd
import numpy as np
board = [['S', 'S', 'S', 'G', 'breeze', 'stench', 'W', 'stench', 'S', 'S'],
['S', 'S', 'S', 'breeze', 'P', 'breeze', 'stench', 'S', 'S', 'S'],
['S', 'S', 'S', 'S', 'breeze', 'S', 'S', 'S', 'S', 'S'], 
['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
['S', 'S', 'breeze', 'S', 'S', 'S', 'S', 'S', 'S', 'S'], 
['S', 'breeze', 'P', 'breeze', 'S', 'S', 'S', 'S', 'S', 'S'],
['S', 'G', 'breeze', 'S', 'S', 'S', 'S', 'S', 'breeze', 'S'],
['S', 'S', 'S', 'S', 'S', 'S', 'S', 'breeze', 'P', 'breeze'],
['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'breeze', 'S'],
['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S']]

arr = np.asarray(board)


pd.DataFrame(arr).to_csv('sample.csv', index=False, header=False)   