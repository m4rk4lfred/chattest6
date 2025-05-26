def count_item_frequencies(transactions):
    frequency = {}
    for transaction in transactions:
        for item in transaction:
            frequency[item] = frequency.get(item, 0) + 1
    return frequency


transactions = [['A', 'B'], ['B', 'C'], ['A', 'C'], ['A', 'D', 'D', 'D']]
print(count_item_frequencies(transactions))
