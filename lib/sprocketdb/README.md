# Sprocket DB Package

This package provides an easy way to get started with Sprocket Datasets in NodeJS


## Example Usage:
```javascript
import {sprocketDb} from "sprocketdb";

const main = async () => {
  const query = await sprocketDb(); // factory function to setup the database

  const aPlayer = await query("SELECT * FROM players LIMIT 1");

  console.log(
    aPlayer[0];
  )
}

main()
```
