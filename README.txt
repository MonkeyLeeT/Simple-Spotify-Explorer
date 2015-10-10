#Simple Spotify Explorer
A simple spotify search engine with design concern focused on UI/UIX. Geez, this really takes more time than it looks!

### How to Run
Just open index.html with valid internet connection, and all libraries are already included correctly.


### Design Concern
1. Use preloading when user sees the last page of current query results, which will query results directly for future display. Therefore when user clicks next to see more tracks, they're already fetched and ready to show.
2. Use caching for user to scroll back. All meta data are stored in memory and can always be used when user keep scrolling back. Total storage for upper limit of Spotify API (100,000 tracks) is still acceptable memory usuage since each track's meta data is limited.

3. Error Prevention
 * Empty input, invalid year range (bigger than current year, less than 0 or non-digits), and other invalid key words will pop up warning message to user before running search.
 * Provide "from" and "to" options for user to choose year, which makes it possible to directly identify invalid year for "from" and "to". Otherwise I have to check for "yyyy" and "yyyy-yyyy", which will ask me to use regular expression and can be unreliable.
 * Next and Previous button will be disabled and enabled based on its actual availability, so that user won't click the button and see nothing.