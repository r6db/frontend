# R6DB Site Overview

## Users  

*values rounded*  

### Browser  

 - 77% Chrome
 - 9% Firefox
 - 8% Safari (4% in-app)

 ### OS  
   
 - 80% Windows
 - 10% Android
 - 8% iOS

 ### Resolution  
 
 - 54% 1920y1080
 - 8% 360x640
 - 4% 1377x768
 - 4% 375x667
  
## current Design  
 - no grid
 - base-length var $l = 10px
 - colors currently defined
   - $primary (season main color. atm #6e3c87)
   - $accent (#ffdb00)
   - $black (desaturate(darken($primary, 25%), 50%))
   - $gray-dark (#2f302f)
   - $gray (#8d99ae)
   - $gray-light (#eae8de)
   - $blue-dark (#101a24)
   - $white (#fefefe)
   - $off-white (#ecebeb)
   - $success (#17bebb)
   - $warn (#ffc914)
   - $danger (#e4562e)
 - media queries
    - medium: 512px
    - large: 768px
    - yourmom: 1200px
    - openmenu: 1500px (menu is permantly open from here on)
    - absurd: 1600px
  - fonts
    - base: 1rem;
    - tiny: 0.5 * base
    - mini: 0.75 * base
    - small: 0.9 * base 
    - normal: base
    - big: 1.5 * base
    - large: 2 * base
    - huge: 3 * base

## Data

### Search  

List of Players with:  

 - id
 - level
 - known aliases (date + name; latest is current name)
 - playtime (casual and ranked)
 - last known playday (can be used for inactivity check)
 - current mmr + rank in all regions

### Profile  
  
 - id
 - level
 - known aliases (date + name)
 - playtime (casual and ranked)
 - last known playday
 - rank current season (for each region)  
   - wins
   - losses
   - abandons
   - rank
   - mmr
   - skill + uncertainty (how good a player is + how sure the system is)
 - past Seasons (same as rank but for finished seasons; all regions)
 - daily ranks (snapshots of last x days; interval not accurate, needs to be filtered)
 - stats  
   - general (ranked, casual and coop queues, all modes, all time)  
     - wins
     - losses
     - kills
     - deaths
     - assists
     - headshots
     - melee kills
     - penetration kills
     - revives
     - bullets fired
     - bullets hit
     - time played 
   - ranked (ranked queue, all modes, all time),  
     casual (casual queue, all modes, all time )   
     - wins
     - losses
     - kills
     - deaths
     - time played
   - bomb (all queues, only bomb mode, all time),  
     secure (all queues, only secure mode, all time),  
     area (all queues, only area mode, all time)  
     - wins
     - losses
     - best score
   - operator (for each op)  
     - wins
     - losses
     - deaths
     - kills
     - time played 
   - weapons (stats per weapon type, all time, might be removed)  
     - kills
     - headshots
     - bullets fired
     - bullets hit

### Leaderboard  
  
  - id
  - name
  - value

### Tweets  
 last 3 tweets from our account. Used for showing updates / issues