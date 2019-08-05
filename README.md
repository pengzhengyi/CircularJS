# CircularJS

> Quickly create circular layout with absolute positioning and transformations

## How To Use

##### 1. Specfify radius and degree in each item

+ For item(s) at center, use `circular-center` class
+ For item(s) at outer sphere, use `circular-item` class
    - use `data-radius="<radius>[px|pt|em|rem|...]"` to specify how far the item positions from the center
    - use `data-degree="[-]<degree>"` to specify at which angle clockwisely the item positions from the above direction

##### 2. Specify radius in enclosing container and specify degree (and override radius) in each item

+ For enclosing container, use `circular-container` class and specify a default radius for every circular item with `data-radius="<radius>[px|pt|em|rem|...]"` attribute
+ For each item, give it either `circular-center` class for item(s) at center or `circular-item` class for item(s) at outer sphere and use `data-degree="[-]<degree>"` attribute 
