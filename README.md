# Insert Mock For VSCode

Easily insert mock data using the multi-cursor.

[![Image from Gyazo](https://i.gyazo.com/31161fdb6707bcf605f83590e943b876.gif)](https://gyazo.com/31161fdb6707bcf605f83590e943b876)

## Usage

Use the following commands from the command palette.

* Insert Mock: Default -> Insert using the mock dataset set as default.
* Insert Mock: Custom -> Insert using a custom configured mock dataset.

See Configuration below for detailed configuration instructions.

## Configuration

### Custom Dataset

With `insertMock.mockDataset` you can add the dataset you want to use.  
Add in the form `dataset name: [string]`.

```js
"insertMock.mockDataset": {
  "default": [
    "Arthur",
    "Daniel",
    "John",
    "Oliver",
    "Steve"
  ],
  "age": [ // You can add datasets in this way.
    "18",
    "21",
    "35",
    "22",
  ],
}
```
A custom set of data sets can be recalled by using the `Insert Mock: Custom` command and specifying the name of the data set.

In addition, Datasets set to `default` can be called by `Insert Mock: Default` without specifying the dataset name. Frequently used data sets can be called smoothly by setting them to `default`.

### Shuffle

With `insertMock.needShuffle`, you can set whether to shuffle the insert quasi of the dataset.  
Disabled by default.