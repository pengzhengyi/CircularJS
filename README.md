# CircularJS

> Quickly create circular layout with absolute positioning and transformations

## How To Use

##### Specify radius and degree

+ When you need a container to place circular items and specify some defaults, you can give the container `circular-container` class.  
  This elements with `circular-container` class will have relative positioning property.  
  You can specify a default radius the same as specifying a radius for circular items (see below)
+ When you need an item to position at container's center, give the element `circular-center` class
+ When you need an item at outer sphere, give the element `circular-item` class and
    + specify the **angle** the element deviated clockwisely from the top (*above*) with `data-degree=<angle>` data attribute, where [angle](https://developer.mozilla.org/en-US/docs/Web/CSS/angle) represents an angle value expressed in degrees, gradians, radians, or turns.  
      The **angle** property will be used to generate a rotation before and a reverse rotation after translation (see [rotate()](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate)).  
      Here are some examples:  
        + `0`
        + `270`
        + `π`
        + `0deg`
        + `0grad`
        + `-2πrad`
        + `2πrad`
        + `1.2turn`

    + specify the **radius** the element distanced from the center with `data-radius=<length>` data attribute, where [length](https://developer.mozilla.org/en-US/docs/Web/CSS/length) represents a distance value.  
      The **radius** property will be used to generate a translation between rotations (see [translate()](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate)).  
      Here are some examples:  
        + `0`
        + `10px`
        + `5rem`

#### Specify position order
