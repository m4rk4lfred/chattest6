.data
ints: .space 24
mergetemp1: .space 12 #left half
mergetemp2: .space 12 #right half
mergetemp3: .space 8
mergetemp4: .space 8
prompt: .asciiz "Enter a number: "
originalarray: .asciiz "Original Array is: "
res: .asciiz "Sorted: "
com_space: .asciiz ", "
space: .asciiz " "
menu: .asciiz "\nChoose Sorting Algorithm:\n1. Bubble Sort\n2. Insertion Sort \n3,Merge Sort\n4. Quicksort \nEnter Choice: "
divide: .asciiz "divide: "
sort: .asciiz "sort: "
merge: .asciiz "merge: "
pivot: .asciiz "Pivot: "
pointers: .asciiz "ptr1 = '>' ptr2 = '<'\n"
ptr1: .asciiz "> "
ptr2: .asciiz "< "
comparing: .asciiz "Comparing Ptr 1 and Pivot: "
swapmsg: .asciiz "Swapping Ptr1 and Ptr2\n"
moveptr1: .asciiz "Moving Ptr1..\n"
moveptr2: .asciiz "Moving Ptr2..\n"
ptr2is: .asciiz "Pointer 2 is now: "
startit: .asciiz "\n-------Start of New Iteration-------\n"


.text
.globl main

main:
    li $t0, 0 #counter
    la $t1, ints #integers

loop:
    li $v0, 4
    la $a0, prompt
    syscall
    
    li $v0, 5
    syscall
    move $t2, $v0  # Store input in $t2
    
    sw	$t2, 0($t1) #store
    addi $t0, $t0, 1 #i++
    add $t1, $t1, 4 #shift 4 for each int
    blt $t0, 6, loop
    
    #++++++++++++++++++++++++++CHANGES
    #Print menu for algorithm selection
    li $v0, 4
    la $a0, menu
    syscall
    
    li $v0, 5
    syscall
    move $s0, $v0  # Store choice in $s0
    
    li $t0, 0 #counter
    la $t1, ints #integers
    
     li $v0, 4
    la $a0, originalarray
    syscall
    
printarray:
    lbu	$t2, 0($t1) #load
    addi $t0, $t0, 1 #i++
    add $t1, $t1, 4 #shift 4 for each int
    
    li $v0, 1
    move $a0, $t2
    syscall
    
    beq $t0, 6, islastdigit
    
    li $v0, 4
    la $a0, com_space
    syscall
islastdigit:
    li $v0, 4
    la $a0, space
    syscall

    blt $t0, 6, printarray
    
    li $v0, 11
    	li $a0, '\n'
   	 syscall
#++++++++++++++++++Changes
 # Branch to appropriate sorting algorithm based on choice
    beq $s0, 4, quick_sort_start # else merge muna.....

    
quick_sort_start:
    	la $t1, ints
    j quicksort
    
    
#-----------------Quicksort-------------------
quicksort:
#step1, get the pivot:
   lw $s0, 20($t1) #last element of ints, we'll be making good use of offsets for quicksort instead compared to the other previous sorts that makes use of temp memory or using an offset 0 and incrementing 
    li $v0, 4
    la $a0, pivot
    syscall

    li $v0, 1
   move $a0, $s0
   syscall

    li $v0, 11
    la $a0, '\n'
    syscall
    
    li $t0, 0 #this serves as our counter
    la $t2, ints #ptr1
    la $t3 ints #ptr2
    li $t4, -1 #locptr1
    li $t5, -1 #locptr2
    
    li $v0, 4
    la $a0, pointers
    syscall
    
    li $v0, 4
    la $a0, startit
    syscall
    
 #i used zero based indices here btw uwah uwah
quickloopstart:
    la $t1, ints
    addiu $t4, $t4, 1 #moveptr1
    li $t7, 0 #innercounter
    li $v0, 4
    la $a0, moveptr1
    syscall
    
printloopqck:
    lw $t6, 0($t1)  #get 
    bne $t4, $t7, dontPrintPtr1 #how specific does my naming have to be?
    li $v0, 4
    la $a0, ptr1
    syscall
 
dontPrintPtr1:
    li $v0, 1
    move $a0, $t6
    syscall
    
    li $v0, 4
    la $a0, space
    syscall
    
    bne $t5, $t7, dontPrintPtr2 #yesnt
    li $v0, 4
    la $a0, ptr2
    syscall
    
dontPrintPtr2:
    addiu $t7, $t7, 1
    add $t1, $t1, 4
    beq $t7, 6, compare
    j printloopqck
    
compare:
    li $v0, 11
    la $a0, '\n'
    syscall
    
    la $t1, ints #this is used to reorder base 
    
    li $v0, 4
    la $a0, comparing
    syscall
    
    li $v0, 1
    lw $t7, 0($t2) #get ptr1
    move $a0, $t7
    syscall
    
     li $v0, 4
    la $a0, com_space
    syscall
    
    li $v0, 1
    move $a0, $s0
    syscall
    
    li $v0, 11
    la $a0, '\n'
    syscall
    
    ble $t7, $s0, moveptr2func
    j skipcompare
    
moveptr2func:
      addiu $t5 $t5, 1 #moveptr2
      li $v0, 4
      la $a0, moveptr2
     syscall
     
     jal printforquicksort
     
     beqz $t5, dontmove #this just means ptr is now on index 0
     add $t3 $t3, 4
dontmove:
    #next stepcheck if equal or ahead
      li $v0, 4
      la $a0, ptr2is
     syscall
     lw $t7 0($t3) #get ptr2
     
    li $v0, 1
    move $a0, $t7
    syscall
    
    li $v0, 11
    la $a0, '\n'
    syscall
    beq $t4, $t5, skipcompare #if they point at the same position, skip else swap
    lw $t8 0($t2) #gets ptr1
    
    li $v0, 4
    la $a0, swapmsg
    syscall
    
    #calculate position of ptr1 and 2
    la $t1, ints
    move $t9, $t4 #gets location of ptr1
    mul $t9, $t9, 4
    add $t1, $t1, $t9 #get offset on ints
    sw $t7 0($t1)
    la $t1, ints #this is used to reorder base 
    move $t9, $t5 #gets location of ptr1
    mul $t9, $t9, 4
    add $t1, $t1, $t9 #get offset on ints
    sw $t8 0($t1)
    
    jal printforquicksort
    
skipcompare:
    add $t0, $t0, 1
    add $t2 $t2, 4
    li $v0, 11
    la $a0, '\n'
    syscall
    bne $t0, 6, quickloopstart
    
#by this point ORIGINAL PIVOT IS LOCKED IN PLACE
#and is now at the position of pointer 2

move $s0, $t5 #location of locked pointer 2
#we'll start on the left side if it is not sorted

move $s2, $s0 #location of the previous pivot
li $s7, 5
ble  $s0, 1, quicksortRIGHTSIDE 
move $s7, $s0 #this is where it will end, originally by pivot's location

# TAKE NOTE
# s0 - is now the location of the first FIXED pivot, from here we sort it's left first
# s1 - is the value of current pivot
# s2- is the location of previous pivot
# s3- the location of the previous->previous pivot
# s4 - value of the pivot (referring to lr)
# s7 - is where the loop ends

quicksortLEFTSIDE:

jal checksorted #if its sorted, exit

ble  $s0, 1, quicksortRIGHTSIDE #if its the first or second element, immediately do right side
#sort using quicksort 0 to n-1, where n is index of new pivot

    li $v0, 4
    la $a0, startit
    syscall

   la $t1, ints
   move $t0, $s2
   subi $t0, $t0, 1
   mul $t0, $t0, 4
   add $t1, $t1, $t0
   #our pivot is now on $s1
   lw $s1, 0($t1) #last element of ints, we'll be making good use of offsets for quicksort instead compared to the other previous sorts that makes use of temp memory or using an offset 0 and incrementing 
    li $v0, 4
    la $a0, pivot
    syscall

    li $v0, 1
   move $a0, $s1
   syscall

    li $v0, 11
    la $a0, '\n'
    syscall
    
    li $t0, 0 #this serves as our counter
    la $t1, ints
    la $t2, ints #ptr1
    la $t3 ints #ptr2
    li $t4, -1 #locptr1
    li $t5, -1 #locptr2

    #i used zero based indices here btw uwah uwah
quickloopstartl:
    la $t1, ints
    addiu $t4, $t4, 1 #moveptr1
    li $t7, 0 #innercounter
    li $v0, 4
    la $a0, moveptr1
    syscall
    
printloopqckl:
    lw $t6, 0($t1)  #get 
    bne $t4, $t7, dontPrintPtr1l #how specific does my naming have to be?
    li $v0, 4
    la $a0, ptr1
    syscall
 
dontPrintPtr1l:
    li $v0, 1
    move $a0, $t6
    syscall
    
    li $v0, 4
    la $a0, space
    syscall
    
    bne $t5, $t7, dontPrintPtr2l #yesnt
    li $v0, 4
    la $a0, ptr2
    syscall
    
dontPrintPtr2l:
    addiu $t7, $t7, 1
    add $t1, $t1, 4
    beq $t7, 6, comparel
    j printloopqckl
    
comparel:
    li $v0, 11
    la $a0, '\n'
    syscall
    
    la $t1, ints #this is used to reorder base 
    
    li $v0, 4
    la $a0, comparing
    syscall
    
    li $v0, 1
    lw $t7, 0($t2) #get ptr1
    move $a0, $t7
    syscall
    
     li $v0, 4
    la $a0, com_space
    syscall
    
    li $v0, 1
    move $a0, $s1
    syscall
    
    li $v0, 11
    la $a0, '\n'
    syscall
    
    ble $t7, $s1, moveptr2funcl
    j skipcomparel
    
moveptr2funcl:
      addiu $t5 $t5, 1 #moveptr2
      li $v0, 4
      la $a0, moveptr2
     syscall
     
     jal printforquicksort
     
     beqz $t5, dontmovel #this just means ptr is now on index 0
     add $t3 $t3, 4
dontmovel:
    #next stepcheck if equal or ahead
      li $v0, 4
      la $a0, ptr2is
     syscall
     lw $t7 0($t3) #get ptr2
     
    li $v0, 1
    move $a0, $t7
    syscall
    
    li $v0, 11
    la $a0, '\n'
    syscall
    beq $t4, $t5, skipcomparel #if they point at the same position, skip else swap
    lw $t8 0($t2) #gets ptr1
    
    li $v0, 4
    la $a0, swapmsg
    syscall
    
    #calculate position of ptr1 and 2
    la $t1, ints
    move $t9, $t4 #gets location of ptr1
    mul $t9, $t9, 4
    add $t1, $t1, $t9 #get offset on ints
    sw $t7 0($t1)
    la $t1, ints #this is used to reorder base 
    move $t9, $t5 #gets location of ptr1
    mul $t9, $t9, 4
    add $t1, $t1, $t9 #get offset on ints
    sw $t8 0($t1)
    
    jal printforquicksort
    
skipcomparel:
    add $t0, $t0, 1
    add $t2 $t2, 4
    li $v0, 11
    la $a0, '\n'
    syscall
    bne $t0, $s7, quickloopstartl

move $s3, $s2 #previous pivot is now previous-previous
move $s2, $t5 #location of locked pointer 2, store at s2
sub $s4, $s3, $s2 #the difference of pivot 1  and pivot 2
blt $s4, 2, skipsortingtherightpartwhilesortingtheleftpart

sortLeftsRight:
#--sort right part of the left part
    li $v0, 4
    la $a0, startit
    syscall
    
   move $s7, $s3

   la $t1, ints
   move $t0, $s3
   subi $t0, $t0, 1
   mul $t0, $t0, 4
   add $t1, $t1, $t0
   #our pivot is now on $s1
   lw $s4, 0($t1) #last element of ints, we'll be making good use of offsets for quicksort instead compared to the other previous sorts that makes use of temp memory or using an offset 0 and incrementing 
    li $v0, 4
    la $a0, pivot
    syscall

    li $v0, 1
   move $a0, $s4
   syscall

    li $v0, 11
    la $a0, '\n'
    syscall
    
    # ptr1 starts at first element of subarray (s2+1)
    la $t2, ints
    move $t0, $s2
    addiu $t0, $t0, 1
    mul $t0, $t0, 4
    add $t2, $t2, $t0

# ptr2 starts at previous pivot (s2)
    la $t3, ints
    move $t0, $s2
    mul $t0, $t0, 4
    add $t3, $t3, $t0
    
    move $t0, $s2 #this serves as our counter
    add $t0, $t0, 1
    la $t1, ints
    move $t4, $s2 #locptr1 from s2
    move $t5, $s2 #locptr2 from s2

    #i used zero based indices here btw uwah uwah
quickloopstartlr:
    la $t1, ints
    addiu $t4, $t4, 1 #moveptr1
    li $t7, 0 #innercounter
    li $v0, 4
    la $a0, moveptr1
    syscall
    
printloopqcklr:
    lw $t6, 0($t1)  #get 
    bne $t4, $t7, dontPrintPtr1lr #how specific does my naming have to be?
    li $v0, 4
    la $a0, ptr1
    syscall
 
dontPrintPtr1lr:
    li $v0, 1
    move $a0, $t6
    syscall
    
    li $v0, 4
    la $a0, space
    syscall
    
    bne $t5, $t7, dontPrintPtr2lr #yesnt
    li $v0, 4
    la $a0, ptr2
    syscall
    
dontPrintPtr2lr:
    addiu $t7, $t7, 1
    add $t1, $t1, 4
    beq $t7, 6, comparelr
    j printloopqcklr
    
comparelr:
    li $v0, 11
    la $a0, '\n'
    syscall
    
    la $t1, ints #this is used to reorder base 
    
    li $v0, 4
    la $a0, comparing
    syscall
    
    li $v0, 1
    lw $t7, 0($t2) #get ptr1
    move $a0, $t7
    syscall
    
     li $v0, 4
    la $a0, com_space
    syscall
    
    li $v0, 1
    move $a0, $s4
    syscall
    
    li $v0, 11
    la $a0, '\n'
    syscall
    
    ble $t7, $s4, moveptr2funclr
    j skipcomparelr
    
moveptr2funclr:
      addiu $t5 $t5, 1 #moveptr2
      li $v0, 4
      la $a0, moveptr2
     syscall
     
     jal printforquicksort
     
     beqz $t5, dontmovelr #this just means ptr is now on index 0
     add $t3 $t3, 4
dontmovelr:
    #next stepcheck if equal or ahead
      li $v0, 4
      la $a0, ptr2is
     syscall
     lw $t7 0($t3) #get ptr2
     
    li $v0, 1
    move $a0, $t7
    syscall
    
    li $v0, 11
    la $a0, '\n'
    syscall
    beq $t4, $t5, skipcomparelr #if they point at the same position, skip else swap
    lw $t8 0($t2) #gets ptr1
    
    li $v0, 4
    la $a0, swapmsg
    syscall
    
    #calculate position of ptr1 and 2
    la $t1, ints
    move $t9, $t4 #gets location of ptr1
    mul $t9, $t9, 4
    add $t1, $t1, $t9 #get offset on ints
    sw $t7 0($t1)
    la $t1, ints #this is used to reorder base 
    move $t9, $t5 #gets location of ptr1
    mul $t9, $t9, 4
    add $t1, $t1, $t9 #get offset on ints
    sw $t8 0($t1)
    
    jal printforquicksort

skipcomparelr:
    add $t0, $t0, 1
    add $t2 $t2, 4
    li $v0, 11
    la $a0, '\n'
    syscall
    bne $t0, $s7, quickloopstartlr
    
    move $s2, $t5 #location of the new lower point, while there's still a gap continue 
    sub $s4, $s3, $s2 #the difference of pivot 1  and pivot 2
    bge $s4, 2, sortLeftsRight

skipsortingtherightpartwhilesortingtheleftpart:
move $s7, $s2
ble  $s2, 1, quicksortRIGHTSIDE
j quicksortLEFTSIDE

quicksortRIGHTSIDE:
    # If only one or two elements in right partition, done
    move $t8, $s7         # $s7 = right bound
    sub $t8, $t8, $s0     # $s0 = left bound (pivot just fixed)
    ble $t8, 1, exit

    li $v0, 4
    la $a0, startit
    syscall

    # Set up pivot for right partition (pivot is at $s7)
    la $t1, ints
    move $t0, $s7
    mul $t0, $t0, 4
    add $t1, $t1, $t0
    lw $s1, 0($t1)         # $s1 = pivot value

    li $v0, 4
    la $a0, pivot
    syscall
    li $v0, 1
    move $a0, $s1
    syscall
    li $v0, 11
    la $a0, '\n'
    syscall

    # Set up pointers and counters
    move $t4, $s0         # locptr1 = left bound (pivot just fixed)
    move $t5, $s0         # locptr2 = left bound (pivot just fixed)
    move $t0, $s0         # counter = left bound

    # ptr1 starts at $s0+1
    la $t2, ints
    move $t6, $s0
    addiu $t6, $t6, 1
    mul $t6, $t6, 4
    add $t2, $t2, $t6

    # ptr2 starts at $s0
    la $t3, ints
    move $t6, $s0
    mul $t6, $t6, 4
    add $t3, $t3, $t6

    # Loop from $s0+1 to $s7 (inclusive)
quickloopstartr:
    la $t1, ints
    addiu $t4, $t4, 1      # moveptr1
    move $t7, $s0
    addiu $t7, $t7, 1      # innercounter = start index
    li $v0, 4
    la $a0, moveptr1
    syscall

printloopqckr:
    lw $t6, 0($t1)
    bne $t4, $t7, dontPrintPtr1r
    li $v0, 4
    la $a0, ptr1
    syscall
dontPrintPtr1r:
    li $v0, 1
    move $a0, $t6
    syscall
    li $v0, 4
    la $a0, space
    syscall
    bne $t5, $t7, dontPrintPtr2r
    li $v0, 4
    la $a0, ptr2
    syscall
dontPrintPtr2r:
    addiu $t7, $t7, 1
    add $t1, $t1, 4
    ble $t7, $s7, printloopqckr

    li $v0, 11
    la $a0, '\n'
    syscall

    # Compare ptr1 to pivot
    la $t1, ints
    lw $t8, 0($t2) # get ptr1 value

    li $v0, 4
    la $a0, comparing
    syscall
    li $v0, 1
    move $a0, $t8
    syscall
    li $v0, 4
    la $a0, com_space
    syscall
    li $v0, 1
    move $a0, $s1
    syscall
    li $v0, 11
    la $a0, '\n'
    syscall

    ble $t8, $s1, moveptr2funcr
    j skipcomparer

moveptr2funcr:
    addiu $t5, $t5, 1
    li $v0, 4
    la $a0, moveptr2
    syscall
    jal printforquicksort
    beqz $t5, dontmover
    add $t3, $t3, 4
dontmover:
    li $v0, 4
    la $a0, ptr2is
    syscall
    lw $t8, 0($t3)
    li $v0, 1
    move $a0, $t8
    syscall
    li $v0, 11
    la $a0, '\n'
    syscall
    beq $t4, $t5, skipcomparer
    lw $t6, 0($t2)
    li $v0, 4
    la $a0, swapmsg
    syscall
    la $t1, ints
    move $t9, $t4
    mul $t9, $t9, 4
    add $t1, $t1, $t9
    sw $t8, 0($t1)
    la $t1, ints
    move $t9, $t5
    mul $t9, $t9, 4
    add $t1, $t1, $t9
    sw $t6, 0($t1)
    jal printforquicksort

skipcomparer:
    add $t0, $t0, 1
    add $t2, $t2, 4
    li $v0, 11
    la $a0, '\n'
    syscall
    blt $t0, $s7, quickloopstartr

    # After partition, update pivots and check for right's left
    move $s3, $s7         # previous right bound
    move $s7, $t5         # new pivot index (locked pointer 2)
    sub $t8, $s7, $s0     # gap between new pivot and left bound
    bge $t8, 2, quicksortRIGHTSIDE

    # Now handle right's left (mirror of sortLeftsRight)
    move $t8, $s0
    addiu $t8, $t8, 1     # left bound for right's left
    move $t9, $s7
    subi $t9, $t9, 1      # right bound for right's left

    sub $t6, $t9, $t8
    blt $t6, 1, exit      # If subarray too small, done

    # Pivot is at $t9
    la $t1, ints
    move $t0, $t9
    mul $t0, $t0, 4
    add $t1, $t1, $t0
    lw $s4, 0($t1)        # $s4 = pivot value

    li $v0, 4
    la $a0, pivot
    syscall
    li $v0, 1
    move $a0, $s4
    syscall
    li $v0, 11
    la $a0, '\n'
    syscall

    # ptr1 starts at $t8
    la $t2, ints
    move $t0, $t8
    mul $t0, $t0, 4
    add $t2, $t2, $t0

    # ptr2 starts at $t8-1
    la $t3, ints
    move $t0, $t8
    subi $t0, $t0, 1
    mul $t0, $t0, 4
    add $t3, $t3, $t0

    move $t4, $t8         # locptr1
    move $t5, $t8         # locptr2

    move $t0, $t8         # counter

quickloopstartrl:
    la $t1, ints
    addiu $t4, $t4, 1     # moveptr1    beq $t4, $t5, skipcomparerl
    # Load values at ptr1 and ptr2
    lw $t6, 0($t2)      # value at ptr1 (current)
    lw $t8, 0($t3)      # value at ptr2 (current)
    li $v0, 4
    la $a0, swapmsg
    syscall
    # Swap values in memory
    la $t1, ints
    move $t9, $t4
    mul $t9, $t9, 4
    add $t1, $t1, $t9
    sw $t8, 0($t1)      # store value from ptr2 at ptr1
    la $t1, ints
    move $t9, $t5
    mul $t9, $t9, 4
    add $t1, $t1, $t9
    sw $t6, 0($t1)      # store value from ptr1 at ptr2
    jal printforquicksort
    move $t7, $t8         # innercounter = left bound for this partition
    li $v0, 4
    la $a0, moveptr1
    syscall

printloopqckrl:
    lw $t6, 0($t1)
    bne $t4, $t7, dontPrintPtr1rl
    li $v0, 4
    la $a0, ptr1
    syscall
dontPrintPtr1rl:
    li $v0, 1
    move $a0, $t6
    syscall
    li $v0, 4
    la $a0, space
    syscall
    bne $t5, $t7, dontPrintPtr2rl
    li $v0, 4
    la $a0, ptr2
    syscall
dontPrintPtr2rl:
    addiu $t7, $t7, 1
    add $t1, $t1, 4
    ble $t7, $t9, printloopqckrl

    li $v0, 11
    la $a0, '\n'
    syscall

    la $t1, ints
    lw $t8, 0($t2) # get ptr1 value

    li $v0, 4
    la $a0, comparing
    syscall
    li $v0, 1
    move $a0, $t8
    syscall
    li $v0, 4
    la $a0, com_space
    syscall
    li $v0, 1
    move $a0, $s4
    syscall
    li $v0, 11
    la $a0, '\n'
    syscall

    ble $t8, $s4, moveptr2funcrl
    j skipcomparerl

moveptr2funcrl:
    addiu $t5, $t5, 1
    li $v0, 4
    la $a0, moveptr2
    syscall
    jal printforquicksort
    beqz $t5, dontmoverl
    add $t3, $t3, 4
dontmoverl:
    li $v0, 4
    la $a0, ptr2is
    syscall
    lw $t8, 0($t3)
    li $v0, 1
    move $a0, $t8
    syscall
    li $v0, 11
    la $a0, '\n'
    syscall
    beq $t4, $t5, skipcomparerl
    lw $t6, 0($t2)
    li $v0, 4
    la $a0, swapmsg
    syscall
    la $t1, ints
    move $t9, $t4
    mul $t9, $t9, 4
    add $t1, $t1, $t9
    sw $t8, 0($t1)
    la $t1, ints
    move $t9, $t5
    mul $t9, $t9, 4
    add $t1, $t1, $t9
    sw $t6, 0($t1)
    jal printforquicksort

skipcomparerl:
    add $t0, $t0, 1
    add $t2, $t2, 4
    li $v0, 11
    la $a0, '\n'
    syscall
    blt $t0, $t9, quickloopstartrl

    # After partition, update pivots and check for more right's left
    move $s7, $t5         # new pivot index (locked pointer 2)
    sub $t6, $t9, $s7     # gap between right bound and new pivot
    bge $t6, 2, quicksortRIGHTSIDE

    j exit
    
#++++++++++++++++++++Changes
exit:
       li $v0, 4
       la $a0, res
       syscall

	li $t0, 0 #reset counter
	la $t1, ints #reset arr pointer

print_final:
    lw	$t2, 0($t1) #load
    addi $t0, $t0, 1 #i++
    add $t1, $t1, 4 #shift 4 for each int
    
    li $v0, 1
    move $a0, $t2
    syscall
    
    beq $t0, 6, islastdigit2
    
    li $v0, 4
    la $a0, com_space
    syscall
    
    j print_final
islastdigit2:
    li $v0, 4
    la $a0, space
    syscall

    blt $t0, 6, exit
    j endprogram

printforquicksort:
 #i used zero based indices here btw uwah uwah
    la $t1, ints
    li $t7, 0 #innercounter
printloopqck2:
    lw $t6, 0($t1)  #get 
    bne $t4, $t7, dontPrintPtr12 #how specific does my naming have to be?
    li $v0, 4
    la $a0, ptr1
    syscall
 
dontPrintPtr12:
    li $v0, 1
    move $a0, $t6
    syscall
    
    li $v0, 4
    la $a0, space
    syscall
    
    bne $t5, $t7, dontPrintPtr22#yesnt
    li $v0, 4
    la $a0, ptr2
    syscall
    
dontPrintPtr22:
    addiu $t7, $t7, 1
    add $t1, $t1, 4
    bne $t7, 6, printloopqck2
    
    li $v0, 11
    la $a0, '\n'
    syscall
    
    jr $ra
    
checksorted:
                li $t0, 0
   		 la $t1, ints         # start of array
	checkloop2:
    		lw $t6, 0($t1)       # load current element
  		lw $t7, 4($t1)       # load next element

    		bgt $t6, $t7, outoforder2  # if out of order, start sorting

 		addi $t1, $t1, 4     # move to next pair
   		addi $t0, $t0, 1
    		blt $t0, 5, checkloop2

    		# If reached here, it's sorted already
    		 li $t0, 0 #counter
   		 la $t1, ints #integers
    		li $v0, 4
    		la $a0, res
    		syscall
    		j exit
    	outoforder2:
    		jr $ra
    
endprogram:
    li $v0, 10
    syscall
