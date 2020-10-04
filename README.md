# Software Studio 2018 Spring Assignment 01 Web Canvas

## Web Canvas

在這次的小畫家中，有下列幾項功能:
(1)顏色變換:在最又排的版面中，一共有14種顏色選擇，而每種顏色的選擇方式為當使用者點及此顏色後，其畫筆顏色即會瞬間變換，每當點擊後，onclick後面function listener(i)即會被呼叫，在此function中，會更改全域變數nowcolor的值，而為甚麼不直接改ctx.strokeStyle的原因是因為我們的橡皮擦做法為直接將筆刷變成白色，但如此行為將會造成無法記得上一次的筆刷顏色，因此我們用nowcolor來記得筆刷顏色。

(2)比刷大小:而左上角出現的即是下拉選項即是比刷大小的選擇，作法是使用select做下拉選項，用onchange="fontSizes(value)"，當value改變時，去呼叫fontSizes(value)。

(3)筆刷:當按下筆刷時，canvas上的游標即會改變，變成一枝筆，而實作筆刷的方式則是先記得一開始按下的點，游標邊移動時邊畫出線，而當mouseup時，一切動作即會停止。

(4)橡皮擦:與筆刷相同，只是筆刷顏色固定為白色。

(5)redo,undo:每當多做一個動作的時候，cstep會加一，並將所有行為存到一個陣列裡，如此即可取得當下的前後行為。

(6)畫長方形,圓形,三角形:依樣要記得一開始mousedown的位置，並且在mouseup的時候畫出圖形，而如何處理會畫出將圖形拉開時的每一步則是:在mousemove的時候，重新on.load上一步的圖。

(7)最右下角的兩個則是可以更改筆刷的刷頭:有圓形跟方形兩種可以選擇。

(8)reset:一旦按下reset鍵(掃把)，所有東西都重頭來過，無法回到上一步。

(9)upload 檔案

(10)把圖檔download下來

(11)text:按enter即可結束輸入框，讓文字畫到canvas上，而一次的畫面中，只會有一個輸入框。

(12)選text的大小跟字型

(13)更改游標:有一個function changetool(i)，在這裡面用switch case的方式去做更動。
