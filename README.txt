name:Tianlong Li
uni:tl2493
subject: Assignment 1 for User Inteface Design
author: Tianlong Li, tl2493@columbia.edu, https://github.com/MonkeyLeeT

=====How to Run=====
Just open index.html with valid internet connection, and all libraries are already included correctly.

====Design Process=====
> Used Spotify API example as starting point, which included js codes to automatically render results and play previews.
> The play effect in the example, which adds border to the cover image and makes it squeezed a bit, is actually very good design, thus kept in the final layout.
> Based on that, first changed search result from album to track, and added more filters into the query.
> Further added features to support each heurisitics during evaluation, which takes most time since each one might require special consideration.

=====Design Concern and Heuristics=====
0) Notable design concern
> Use preloading when user sees the last page of current query results, which will query results directly for future display. Therefore when user clicks next to see more tracks, they're already fetched and ready to show.
> Use caching for user to scroll back. All meta data are stored in memory and can always be used when user keep scrolling back. Total storage for upper limit of Spotify API (100,000 tracks) is still acceptable memory usuage since each track's meta data is limited.

1) Visibility of system status
> Loading animation is provided on search button, though it ends usually very quickly.
> Current location in the total possible results is indicated to user.

2) Match between system and the real world
> Icons and colors are used to resemble a generally spotify audio player.
> Track covers are shaped round to resemble a actual "track".

3) User control and freedom
> Since it's single page application, there's no worry for this.
> But still we have "prev 10" button to go backwards.

4) Consistency and standards
> I first thought about using "last 10" and "next 10", then decided to use "prev 10" and "next 10" to keep things consistent, with the help of icon.

5) Error prevention
> Empty input, invalid year range (bigger than current year, less than 0 or non-digits), and other invalid key words will pop up warning message to user before running search.
> Provide "from" and "to" options for user to choose year, which makes it possible to directly identify invalid year for "from" and "to". Otherwise I have to check for "yyyy" and "yyyy-yyyy", which will ask me to use regular expression and can be unreliable.
> Next and Previous button will be disabled and enabled based on its actual availability, so that user won't click the button and see nothing.

6) Recognition rather than recall
> Html's default input history is used to assist search history, advanced version needs backend storage and user-specific data, thus skipped.
> Input area is aligned with result area so that user has minimum effort of checking previous search keywords.

7) Flexibility and efficiency of use
> This app is too simple to consider this.

8) Aesthetic and minimalist design
> Semantic UI is used since it focus more on providing minimalist design.
> Symetrcitty and alignment is pursued as much as I can.

9) Help users recognize, diagnose, and recover from errors
> If no results are returned, will remind user and ask him or her to check input again, which might be valid but not matching anything.

10) Help and documentation
> Help texts are shown directly above input area.
