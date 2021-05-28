import re
import nltk
import numpy as np
from nltk.tree import *

# nltk.download('punkt')

# https://www.ling.upenn.edu/courses/Fall_2003/ling001/penn_treebank_pos.html
# DT = Determiner
# RB = Adverb
# JJ = Adjective
# NN = Noun, Singular
# NNS = Noun, Plural
# NNP = Proper Noun, Singular
# NNP = Proper Noun, Plural

# https://pypi.org/project/pydot/

# https://www3.diism.unisi.it/~maggini/Teaching/TEL/slides%20EN/07%20-%20NLP%20-%20Syntax.pdf
# https://courses.washington.edu/hypertxt/csar-v02/penntable.html

def tokenize(string):
    return string.split(' ')

def getPOSTag(listOfWords):
    words = nltk.pos_tag(listOfWords)
    newList = list()
    for word in words:
        newList.append([word[0], "<" + word[1] + ">"])
    return newList

def chunking(words_with_pos_tag):
    noun_phrase = r"^(\<DT\>)?(\<RB\>)?(\<JJ\>)*(\<NN\>|\<NNS\>|\<NNP\>|\<NNPS\>)$"
    verb_phrase = r"^(\<MD\>)?(\<RB\>)?(\<VB(D|G|N|P|Z)?\>)$"

    to_check_chunk = [
        ["NP", noun_phrase],
        ["VBP", verb_phrase],
    ]

    word_list = np.transpose(np.array(words_with_pos_tag))
    chunkered = [None] * len(word_list[0])

    chunked = True
    pos_string = ""
    while chunked:
        chunked = False
        for i in range(len(word_list[0])):
            for j in range(i+1, len(word_list[0])):
                sentence = " ".join(word_list[0][i:(j + 1)]) # Plus one since slicing stops at that point
                pos_tags = "".join(word_list[1][i:(j + 1)])

                for to_chunk in to_check_chunk:
                    found_obj = re.search(to_chunk[1], pos_tags)
                    if(found_obj != None and not chunked):
                        start, end = i, i + (pos_tags.count("<"))
                        new_chunk = list()
                        for x in range(start, end):
                            new_chunk.append([word_list[0][start], word_list[1][start]])
                            if x != (end - 1):
                                word_list = np.delete(word_list, start, 1)
                                chunkered.pop(start)
                        new_chunk = np.transpose(np.array(new_chunk))
                        chunkered[start] = new_chunk

                        word_list[0][start] = to_chunk[0]
                        word_list[1][start] = "<" + to_chunk[0] + ">"

                        chunked = True
                if chunked:
                    break
            if chunked:
                break

    return (word_list, chunkered)

def createTree(word_list, chunkered, drawTree=True):
    tree_children = list()
    for i in range(len(word_list[0])):
        if (chunkered[i] is not None):
            tree_grandchildren = list()
            for j in range(len(chunkered[i][0])):
                tree_grandchildren.append(chunkered[i][0][j] + " " + chunkered[i][1][j])
            tree_children.append(Tree(word_list[0][i], tree_grandchildren))
        else:
            tree_children.append(word_list[0][i] + " " + word_list[1][i])
    tree = Tree('S', tree_children)
    if(drawTree):
        tree.draw()

def main():
    print("Input sentence (input blank for test case):")
    sentence = input().strip()
    if sentence == "":
        sentence = "A very big cat casually jumps over a small fence, was also seen carrying a fish on its mouth."
    print(f"Sentence: {sentence}")
    tokenized = tokenize(sentence)
    print(f"Tokenized: {tokenized}")
    words_with_pos_tag = getPOSTag(tokenized)
    chunked_sentence = chunking(words_with_pos_tag)
    print(chunked_sentence)

    createTree(chunked_sentence[0], chunked_sentence[1])

# print(nltk.help.upenn_tagset('pp'))
# main()
