# iphone-availability-checker
A node script to check iPhone availability.

Latest update: 2016 (iPhone 7)

Checks for inventory at specified stores, and sends a [pushover](https://pushover.net/) notification when specific models are available.
View source on [the reservation page](https://reserve.cdn-apple.com/US/en_US/reserve/iPhone/availability?returnURL=http%3A%2F%2Fwww.apple.com%2Fshop%2Fbuy-iphone%2Fiphone6s&channel=1&iPP=Y) to get the model number(s), and look through [`stores.json`](https://reserve.cdn-apple.com/US/en_US/reserve/iPhone/stores.json) to find the store number(s).

The code is quick and dirty, but it gets the job done.

## Requirements:
- node

## Usage:
1. Clone.
2. Edit model numbers, stores, and pushover details (if desired; not necessary).
3. `npm install`
4. `npm start`

<!--- cheers! ---> :beers:
