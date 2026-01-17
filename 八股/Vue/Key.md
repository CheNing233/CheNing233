- 如果不用key，Vue会采用就地复地原则：最小化element的移动，并且会尝试尽最大程度在同适当的地方对相同类型的element，做patch或者reuse。
    
- 如果使用了key，Vue会根据keys的顺序记录element，曾经拥有了key的element如果不再出现的话，会被直接remove或者destoryed

总的来说，就是没key时使用就地复用原则，此时DOM节点对于Vue是无顺序的；用了key之后，Vue会优先diff相同key的节点进行更新

