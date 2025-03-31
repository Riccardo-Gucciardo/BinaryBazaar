# Database E-commerce - Esempi di Query SQL

Questo README contiene 30 esempi di query SQL basate sullo schema di un database e-commerce che gestisce brand, prodotti (laptop e accessori), promozioni, ordini e dettagli specifici. Le query sono suddivise in difficoltà media e alta e sono tutte presentate in un unico file.

## Schema del Database
- **brands**: Elenco dei marchi (brand_id, name).
- **promotions**: Codici promozionali (promotion_id, code, discount, valid_from, valid_to).
- **products**: Prodotti in vendita (product_id, name, model, slug, brand_id, category, price, discount_price, ecc.).
- **laptop_details**: Specifiche dei laptop (product_id, processor, ram, memory, video_card, os, year).
- **accessory_details**: Specifiche degli accessori (product_id, type, compatibility).
- **orders**: Ordini dei clienti (order_id, name, lastname, email, address, total, promotion_id, ecc.).
- **product_order**: Dettagli dei prodotti ordinati (order_id, product_id, quantity, price, name).

---

## Query di Esempio

### Difficoltà Media

1. **Trova tutti i prodotti con uno sconto attivo**  
   *Spiegazione*: Elenca i prodotti con un prezzo scontato, utile per promozioni attive.  

   ```sql 
   SELECT name, price, discount_price
   FROM products
   WHERE discount_price IS NOT NULL AND discount_price < price;
   ```
   <!--! UTILE -->

2. **Elenca i laptop con più di 8GB di RAM**
*Spiegazione*: Filtra i laptop con RAM superiore a 8GB per esigenze di prestazioni. 

    ```sql
    SELECT p.name, ld.ram
    FROM products p
    JOIN laptop_details ld ON p.product_id = ld.product_id
    WHERE ld.ram > 8;
    ```

3. **Mostra i brand con più di un prodotto**
 *Spiegazione*: Identifica i brand con un catalogo diversificato.
 ```sql
 SELECT b.name, COUNT(p.product_id) as num_prodotti FROM brands b JOIN products p ON b.brand_id = p.brand_id GROUP BY b.name HAVING COUNT(p.product_id) > 1; 
```
 4. **Trova gli accessori compatibili con Windows**
  *Spiegazione*: Utile per clienti che cercano accessori per Windows. 
 ```sql
  SELECT p.name, ad.compatibility FROM products p JOIN accessory_details ad ON p.product_id = ad.product_id WHERE ad.compatibility LIKE '%Windows%'; 
 ```
  5. **Calcola il totale degli ordini per cliente**
   *Spiegazione*: Mostra quanto ogni cliente ha speso complessivamente. 

    ```sql
    SELECT name, lastname, SUM(total) as totale_speso FROM orders GROUP BY name, lastname; 
    ```

   6. **Elenca i prodotti con stock inferiore a 10**
   *Spiegazione*: Identifica i prodotti da riassortire urgentemente. 
  ```sql
   SELECT name, stock FROM products WHERE stock < 10; 
  ```
   7. **Trova le promozioni valide oggi**
   *Spiegazione*: Mostra le promozioni attive alla data corrente. 
  ```sql
   SELECT code, discount FROM promotions WHERE CURDATE() BETWEEN valid_from AND valid_to; 
  ```
   8. **Mostra i laptop con processore Intel**
   *Spiegazione*: Filtra i laptop per marca di processore. 
  ```sql
   SELECT p.name, ld.processor FROM products p JOIN laptop_details ld ON p.product_id = ld.product_id WHERE ld.processor LIKE '%Intel%'; 
  ```
   9. **Elenca gli ordini con promozioni applicate**
    *Spiegazione*: Mostra gli ordini che hanno beneficiato di uno sconto. 
   ```sql
    SELECT o.order_id, o.total, p.code FROM orders o JOIN promotions p ON o.promotion_id = p.promotion_id; 
   ```
    10. **Trova i prodotti più costosi per categoria** *Spiegazione*: Identifica il prodotto più caro in ogni categoria. 
   ```sql
    SELECT category, name, price FROM products WHERE price = (SELECT MAX(price) FROM products p2 WHERE p2.category = products.category); 
   ```
    11. **Mostra i clienti che hanno ordinato accessori**
    *Spiegazione*: Elenca i clienti che hanno acquistato accessori. 
   ```sql
    SELECT DISTINCT o.name, o.lastname FROM orders o JOIN product_order po ON o.order_id = po.order_id JOIN products p ON po.product_id = p.product_id WHERE p.category = 'accessory'; 
   ```
    12. **Calcola il numero di prodotti per brand**
    *Spiegazione*: Include anche i brand senza prodotti grazie a LEFT JOIN. 
   ```sql
    SELECT b.name, COUNT(p.product_id) as num_prodotti FROM brands b LEFT JOIN products p ON b.brand_id = p.brand_id GROUP BY b.name; 
   ```
    13. **Trova i laptop con SSD da 512GB**
    *Spiegazione*: Filtra i laptop con una specifica capacità di memoria. 
   ```sql
    SELECT p.name, ld.memory FROM products p JOIN laptop_details ld ON p.product_id = ld.product_id WHERE ld.memory = 512; 
   ```
    14. **Elenca gli ordini recenti (ultimi 7 giorni)**
    *Spiegazione*: Mostra gli ordini dell’ultima settimana. 
   ```sql
    SELECT order_id, order_date FROM orders WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY); 
   ```
    15. **Mostra i prodotti senza dettagli specifici** 
    *Spiegazione*: Identifica i prodotti senza informazioni dettagliate. 
    ```sql
     SELECT p.name, p.category FROM products p LEFT JOIN laptop_details ld ON p.product_id = ld.product_id LEFT JOIN accessory_details ad ON p.product_id = ad.product_id WHEREon WHERE ld.product_id IS NULL AND ad.product_id IS NULL; 
     ```
      16. **Trova il prodotto più venduto** 
      *Spiegazione*: Determina il prodotto con il maggior numero di unità vendute. 
    ```sql
     SELECT p.name, SUM(po.quantity) as totale_venduto FROM products p JOIN product_order po ON p.product_id = po.product_id GROUP BY p.name ORDER BY totale_venduto DESC LIMIT 1; 
     ```
      17. **Calcola il risparmio totale grazie alle promozioni** 
      *Spiegazione*: Quantifica il beneficio economico delle promozioni. 
    ```sql
     SELECT SUM(p.price - o.total) as risparmio_totale FROM orders o JOIN product_order po ON o.order_id = po.order_id JOIN products p ON po.product_id = p.product_id WHERE o.promotion_id IS NOT NULL; 
     ```
      18. **Elenca i laptop con prezzo scontato medio per brand** 
      *Spiegazione*: Calcola il prezzo medio scontato dei laptop per brand. 
    ```sql
     SELECT b.name, AVG(p.discount_price) as prezzo_scontato_medio FROM brands b JOIN products p ON b.brand_id = p.brand_id WHERE p.category = 'laptop' AND p.discount_price IS NOT NULL GROUP BY b.name; 
     ```
      19. **Trova i clienti che hanno speso più della media** 
      *Spiegazione*: Usa una CTE per confrontare la spesa dei clienti con la media. 
    ```sql
     WITH MediaSpesa AS ( SELECT AVG(total) as media FROM orders ) SELECT o.name, o.lastname, o.total FROM orders o, MediaSpesa ms WHERE o.total > ms.media; 
     ```
      20. **Mostra i prodotti non ancora ordinati** 
     *Spiegazione*: Identifica i prodotti che non sono mai stati acquistati. 
    ```sql
     SELECT p.name FROM products p LEFT JOIN product_order po ON p.product_id = po.product_id WHERE po.product_id IS NULL; 
     ```
      21. **Calcola il fatturato totale per mese** 
     *Spiegazione*: Aggrega il fatturato per mese, utile per analisi temporali. 
    ```sql
     SELECT DATE_FORMAT(order_date, '%Y-%m') as mese, SUM(total) as fatturato FROM orders GROUP BY DATE_FORMAT(order_date, '%Y-%m') ORDER BY mese; 
     ```
      22. **Trova i laptop con la RAM più alta per anno** 
     *Spiegazione*: Identifica i laptop con più RAM per ogni anno di produzione. 
    ```sql
     SELECT ld.year, p.name, ld.ram FROM products p JOIN laptop_details ld ON p.product_id = ld.product_id WHERE ld.ram = (SELECT MAX(ram) FROM laptop_details ld2 WHERE ld2.year = ld.year); 
     ```
      23. **Elenca i clienti con ordini multipli nello stesso mese** 
     *Spiegazione*: Trova i clienti che hanno effettuato più ordini nello stesso mese. 
    ```sql
     SELECT name, lastname, DATE_FORMAT(order_date, '%Y-%m') as mese, COUNT(*) as num_ordini FROM orders GROUP BY name, lastname, DATE_FORMAT(order_date, '%Y-%m') HAVING COUNT(*) > 1; 
     ```
      24. **Mostra i brand con fatturato superiore a 1000** 
     *Spiegazione*: Calcola il fatturato per brand e filtra quelli sopra i 1000. 
    ```sql
     SELECT b.name, SUM(po.price * po.quantity) as fatturato FROM brands b JOIN products p ON b.brand_id = p.brand_id JOIN product_order po ON p.product_id = po.product_id GROUP BY b.name HAVING SUM(po.price * po.quantity) > 1000;
      ```
      25. **Trova gli accessori più economici per tipo** 
     *Spiegazione*: Identifica l’accessorio più economico per ogni tipo. 
    ```sql
     SELECT ad.type, p.name, p.price FROM products p JOIN accessory_details ad ON p.product_id = ad.product_id WHERE p.price = (SELECT MIN(price) FROM products p2 JOIN accessory_details ad2 ON p2.product_id = ad2.product_id WHERE ad2.type = ad.type); 
     ```
      26. **Calcola la percentuale di sconto applicata agli ordini** 
     *Spiegazione*: Determina la percentuale di sconto effettiva per ogni ordine. 
    ```sql
     SELECT o.order_id, p.code, ROUND(((po.price - o.total) / po.price) * 100, 2) as sconto_percentuale FROM orders o JOIN product_order po ON o.order_id = po.order_id JOIN promotions p ON o.promotion_id = p.promotion_id; 
     ```
      27. **Trova i laptop con il miglior rapporto prezzo/RAM** 
     *Spiegazione*: Identifica il laptop più conveniente in base al costo per GB di RAM. 
    ```sql
     SELECT p.name, p.price / ld.ram as rapporto_prezzo_ram FROM products p JOIN laptop_details ld ON p.product_id = ld.product_id ORDER BY rapporto_prezzo_ram ASC LIMIT 1; 
     ```
      28. **Mostra il numero di ordini per fascia di prezzo** 
     *Spiegazione*: Classifica gli ordini in fasce di prezzo. 
    ```sql
     SELECT CASE WHEN total < 500 THEN '0-500' WHEN total BETWEEN 500 AND 1500 THEN '500-1500' ELSE '1500+' END as fascia_prezzo, COUNT(*) as num_ordini FROM orders GROUP BY fascia_prezzo; 
     ```
      29. **Trova i prodotti con stock inferiore alla media** 
     *Spiegazione*: Usa una CTE per confrontare lo stock con la media. 
    ```sql
     WITH MediaStock AS ( SELECT AVG(stock) as media FROM products ) SELECT name, stock FROM products, MediaStock ms WHERE stock < ms.media; 
     ```
      30. **Calcola il fatturato perso per stock esaurito** 
     *Spiegazione*: Stima il fatturato perso assumendo che lo stock ideale sia 10. 
    ```sql
     SELECT p.name, p.price * (10 - p.stock) as fatturato_perso FROM products p WHERE p.stock < 10; 
     ```

     31. **Trova i 3 brand con il maggior fatturato cumulativo**  
    *Spiegazione*: Usa una window function per classificare i brand in base al fatturato totale.  
    ```sql
    SELECT b.name, SUM(po.price * po.quantity) as fatturato
    FROM brands b
    JOIN products p ON b.brand_id = p.brand_id
    JOIN product_order po ON p.product_id = po.product_id
    GROUP BY b.name
    ORDER BY fatturato DESC
    LIMIT 3;
    ```

32. **Calcola il prezzo medio dei laptop per anno di produzione**  
    *Spiegazione*: Aggrega i prezzi dei laptop per anno usando una join con laptop_details.  
    ```sql
    SELECT ld.year, AVG(p.price) as prezzo_medio
    FROM products p
    JOIN laptop_details ld ON p.product_id = ld.product_id
    GROUP BY ld.year
    HAVING COUNT(*) > 1;
    ```

33. **Trova i clienti che hanno ordinato sia laptop che accessori**  
    *Spiegazione*: Usa una subquery per identificare clienti con ordini di entrambe le categorie.  
    ```sql
    SELECT DISTINCT o.name, o.lastname
    FROM orders o
    JOIN product_order po ON o.order_id = po.order_id
    JOIN products p ON po.product_id = p.product_id
    WHERE p.category = 'laptop'
    AND EXISTS (
        SELECT 1
        FROM orders o2
        JOIN product_order po2 ON o2.order_id = po2.order_id
        JOIN products p2 ON po2.product_id = p2.product_id
        WHERE o2.name = o.name AND o2.lastname = o.lastname AND p2.category = 'accessory'
    );
    ```

34. **Mostra i prodotti con uno sconto superiore alla media degli sconti**  
    *Spiegazione*: Usa una CTE per calcolare la media degli sconti e confrontarla.  
    ```sql
    WITH MediaSconto AS (
        SELECT AVG(price - discount_price) as media_sconto
        FROM products
        WHERE discount_price IS NOT NULL
    )
    SELECT p.name, (p.price - p.discount_price) as sconto_applicato
    FROM products p, MediaSconto ms
    WHERE p.discount_price IS NOT NULL AND (p.price - p.discount_price) > ms.media_sconto;
    ```

35. **Calcola il fatturato cumulativo per cliente con ranking**  
    *Spiegazione*: Usa una window function per assegnare un rank ai clienti in base alla spesa.  
    ```sql
    SELECT name, lastname, SUM(total) as totale_speso,
           RANK() OVER (ORDER BY SUM(total) DESC) as rank_spesa
    FROM orders
    GROUP BY name, lastname;
    ```

36. **Trova i laptop con specifiche superiori alla media (RAM e memoria)**  
    *Spiegazione*: Confronta RAM e memoria con le medie usando una CTE.  
    ```sql
    WITH MediaSpecifiche AS (
        SELECT AVG(ram) as media_ram, AVG(memory) as media_memoria
        FROM laptop_details
    )
    SELECT p.name, ld.ram, ld.memory
    FROM products p
    JOIN laptop_details ld ON p.product_id = ld.product_id, MediaSpecifiche ms
    WHERE ld.ram > ms.media_ram AND ld.memory > ms.media_memoria;
    ```

37. **Mostra il trend di ordini per trimestre**  
    *Spiegazione*: Aggrega gli ordini per trimestre e calcola il totale.  
    ```sql
    SELECT CONCAT(YEAR(order_date), '-Q', QUARTER(order_date)) as trimestre,
           COUNT(*) as num_ordini, SUM(total) as fatturato
    FROM orders
    GROUP BY YEAR(order_date), QUARTER(order_date)
    ORDER BY trimestre;
    ```

38. **Trova i prodotti con il maggior margine di sconto per categoria**  
    *Spiegazione*: Calcola la differenza tra prezzo originale e scontato per categoria.  
    ```sql
    SELECT p.category, p.name, (p.price - p.discount_price) as margine_sconto
    FROM products p
    WHERE p.discount_price IS NOT NULL
    AND (p.price - p.discount_price) = (
        SELECT MAX(p2.price - p2.discount_price)
        FROM products p2
        WHERE p2.category = p.category AND p2.discount_price IS NOT NULL
    );
    ```

39. **Elenca i clienti con ordini superiori al 90° percentile**  
    *Spiegazione*: Usa una window function per calcolare i percentili e filtrare i top spender.  
    ```sql
    WITH Percentili AS (
        SELECT name, lastname, total,
               PERCENT_RANK() OVER (ORDER BY total) as percentile_rank
        FROM orders
    )
    SELECT name, lastname, total
    FROM Percentili
    WHERE percentile_rank > 0.9;
    ```

40. **Trova i brand con prodotti invenduti in tutte le categorie**  
    *Spiegazione*: Identifica i brand con almeno un prodotto non ordinato per categoria.  
    ```sql
    SELECT b.name
    FROM brands b
    JOIN products p ON b.brand_id = p.brand_id
    LEFT JOIN product_order po ON p.product_id = po.product_id
    WHERE po.product_id IS NULL
    GROUP BY b.name
    HAVING COUNT(DISTINCT p.category) = (SELECT COUNT(DISTINCT category) FROM products);
    ```

41. **Calcola la variazione di fatturato tra mesi consecutivi**  
    *Spiegazione*: Usa una window function per confrontare il fatturato mese per mese.  
    ```sql
    WITH FatturatoMensile AS (
        SELECT DATE_FORMAT(order_date, '%Y-%m') as mese, SUM(total) as fatturato
        FROM orders
        GROUP BY DATE_FORMAT(order_date, '%Y-%m')
    )
    SELECT mese, fatturato,
           fatturato - LAG(fatturato, 1) OVER (ORDER BY mese) as variazione
    FROM FatturatoMensile;
    ```

42. **Trova i laptop più vecchi ancora in stock**  
    *Spiegazione*: Identifica i laptop con l’anno di produzione più basso ancora disponibili.  
    ```sql
    SELECT p.name, ld.year
    FROM products p
    JOIN laptop_details ld ON p.product_id = ld.product_id
    WHERE p.stock > 0
    AND ld.year = (SELECT MIN(year) FROM laptop_details WHERE year IS NOT NULL);
    ```

43. **Mostra i clienti con ordini ripetuti nello stesso giorno**  
    *Spiegazione*: Trova i clienti che hanno effettuato più ordini nella stessa data.  
    ```sql
    SELECT name, lastname, DATE(order_date) as data_ordine, COUNT(*) as num_ordini
    FROM orders
    GROUP BY name, lastname, DATE(order_date)
    HAVING COUNT(*) > 1;
    ```

44. **Calcola il valore medio degli ordini per promozione**  
    *Spiegazione*: Aggrega il totale degli ordini per codice promozionale.  
    ```sql
    SELECT p.code, AVG(o.total) as valore_medio_ordine
    FROM promotions p
    LEFT JOIN orders o ON p.promotion_id = o.promotion_id
    GROUP BY p.code
    HAVING COUNT(o.order_id) > 0;
    ```

45. **Trova i prodotti con il maggior numero di ordini multipli**  
    *Spiegazione*: Identifica i prodotti acquistati più volte nello stesso ordine.  
    ```sql
    SELECT p.name, COUNT(*) as num_ordini_multipli
    FROM products p
    JOIN product_order po ON p.product_id = po.product_id
    WHERE po.quantity > 1
    GROUP BY p.name
    ORDER BY num_ordini_multipli DESC
    LIMIT 1;
    ```

46. **Mostra i brand con fatturato sopra la media per categoria**  
    *Spiegazione*: Confronta il fatturato dei brand con la media della categoria.  
    ```sql
    WITH FatturatoPerBrand AS (
        SELECT b.name, p.category, SUM(po.price * po.quantity) as fatturato
        FROM brands b
        JOIN products p ON b.brand_id = p.brand_id
        JOIN product_order po ON p.product_id = po.product_id
        GROUP BY b.name, category
    ),
    MediaCategoria AS (
        SELECT category, AVG(fatturato) as media_fatturato
        FROM FatturatoPerBrand
        GROUP BY category
    )
    SELECT fb.name, fb.category, fb.fatturato
    FROM FatturatoPerBrand fb
    JOIN MediaCategoria mc ON fb.category = mc.category
    WHERE fb.fatturato > mc.media_fatturato;
    ```

47. **Trova i laptop con specifiche uniche (RAM o memoria)**  
    *Spiegazione*: Identifica i laptop con RAM o memoria che nessun altro laptop ha.  
    ```sql
    SELECT p.name, ld.ram, ld.memory
    FROM products p
    JOIN laptop_details ld ON p.product_id = ld.product_id
    WHERE ld.ram IN (
        SELECT ram
        FROM laptop_details
        GROUP BY ram
        HAVING COUNT(*) = 1
    )
    OR ld.memory IN (
        SELECT memory
        FROM laptop_details
        GROUP BY memory
        HAVING COUNT(*) = 1
    );
    ```

48. **Calcola il tempo medio tra ordini per cliente**  
    *Spiegazione*: Usa una window function per calcolare l’intervallo tra ordini consecutivi.  
    ```sql
    WITH OrdiniConLag AS (
        SELECT name, lastname, order_date,
               LAG(order_date) OVER (PARTITION BY name, lastname ORDER BY order_date) as ordine_precedente
        FROM orders
    )
    SELECT name, lastname, AVG(DATEDIFF(order_date, ordine_precedente)) as giorni_medi_tra_ordini
    FROM OrdiniConLag
    WHERE ordine_precedente IS NOT NULL
    GROUP BY name, lastname;
    ```

49. **Trova i prodotti scontati più venduti**  
    *Spiegazione*: Combina vendite e sconti per identificare i prodotti più popolari scontati.  
    ```sql
    SELECT p.name, SUM(po.quantity) as totale_venduto, (p.price - p.discount_price) as sconto
    FROM products p
    JOIN product_order po ON p.product_id = po.product_id
    WHERE p.discount_price IS NOT NULL
    GROUP BY p.name, p.price, p.discount_price
    ORDER BY totale_venduto DESC
    LIMIT 3;
    ```

50. **Mostra i clienti con ordini in tutte le promozioni attive**  
    *Spiegazione*: Verifica quali clienti hanno usato tutte le promozioni disponibili.  
    ```sql
    SELECT o.name, o.lastname
    FROM orders o
    JOIN promotions p ON o.promotion_id = p.promotion_id
    WHERE CURDATE() BETWEEN p.valid_from AND p.valid_to
    GROUP BY o.name, o.lastname
    HAVING COUNT(DISTINCT p.promotion_id) = (
        SELECT COUNT(*)
        FROM promotions
        WHERE CURDATE() BETWEEN valid_from AND valid_to
    );
    ```

