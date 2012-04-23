'vaders
SCREEN 0: WIDTH 80, 25: COLOR 7, 0: CLS
ON ERROR GOTO duh
l$ = CHR$(0) + "K": r$ = CHR$(0) + "M": f$ = " "
you$ = "№–№"
vad$ = "урт"
ym$ = "к"
vm$ = "Э"
DIM ym(2, 1), vm(2, 1), vs(10, 2)
lv = 1: score = 0: lives = 3
pp:
CLS
x = 40
FOR q = 0 TO 2
  ym(q, 0) = 0: ym(q, 1) = 0: vm(q, 0) = 0: vm(q, 1) = 0
NEXT
FOR q = 0 TO 10
  vs(q, 0) = 20 + (q * 5)
  vs(q, 1) = 2 + INT(lv / 3)
  vs(q, 2) = 1
NEXT
pl:
qq$ = "BLV  Level" + STR$(lv) + "  Score:" + STR$(score) + "  Lives:" + STR$(lives)
qq = 80 - LEN(qq$)
LOCATE 1, 1: PRINT qq$; STRING$(qq, f$);
q$ = INKEY$
IF q$ <> "" THEN
  LOCATE 25, x: PRINT "   ";
  IF q$ = l$ AND x >= 3 THEN x = x - 2
  IF q$ = r$ AND x <= 74 THEN x = x + 2
  IF q$ = CHR$(27) THEN GOTO thend
  IF q$ = f$ THEN
    m = -1
    FOR q = 0 TO 2
      IF ym(q, 0) = 0 THEN m = q
    NEXT
    IF m >= 0 THEN
      ym(m, 0) = x + 1: ym(m, 1) = 25
    END IF
  END IF
END IF
qwerty = 0
FOR q = 0 TO 10
  IF vs(q, 0) > 0 THEN
    qwerty = qwerty + 1
    LOCATE vs(q, 1), vs(q, 0): PRINT "   ";
    we = CINT((vs(q, 2) * lv) / 2)
    IF we = 0 THEN we = vs(q, 2)
    vs(q, 0) = vs(q, 0) + we
    IF vs(q, 0) < 1 THEN vs(q, 0) = 1: vs(q, 2) = 1: vs(q, 1) = vs(q, 1) + 1
    IF vs(q, 0) > 75 THEN vs(q, 0) = 75: vs(q, 2) = -1: vs(q, 1) = vs(q, 1) + 1
    IF vs(q, 1) = 25 THEN
      lives = lives - 1: IF lives = 0 THEN GOTO thend
      GOTO pp
    END IF
    LOCATE vs(q, 1), vs(q, 0): PRINT vad$;
    IF vs(q, 0) - 1 >= x - 1 AND vs(q, 0) + 3 <= x + 3 THEN
      m = -1
      FOR qq = 0 TO 2
        IF vm(qq, 0) = 0 THEN m = qq
      NEXT
      IF m >= 0 THEN
        vm(m, 0) = vs(q, 0) + 1: vm(m, 1) = vs(q, 1) + 2
      END IF
    END IF
    FOR qq = 0 TO 2
      IF ym(qq, 1) = vs(q, 1) AND ym(qq, 0) >= vs(q, 0) AND ym(qq, 0) <= vs(q, 0) + 2 THEN LOCATE vs(q, 1), vs(q, 0): PRINT "   "; : vs(q, 0) = 0: score = score + 10: ym(qq, 0) = 0
    NEXT
  END IF
NEXT
LOCATE 25, x: PRINT you$;
FOR q = 0 TO 2
  IF ym(q, 0) > 0 THEN
    ym(q, 1) = ym(q, 1) - 1
    IF ym(q, 1) < 24 THEN LOCATE ym(q, 1) + 1, ym(q, 0): PRINT f$;
    LOCATE ym(q, 1), ym(q, 0): PRINT ym$;
    IF ym(q, 1) = 1 THEN ym(q, 0) = 0
  END IF
NEXT
FOR q = 0 TO 2
  IF vm(q, 0) > 0 THEN
    vm(q, 1) = vm(q, 1) + 1
    LOCATE vm(q, 1) - 1, vm(q, 0): PRINT f$;
    LOCATE vm(q, 1), vm(q, 0): PRINT vm$;
    IF vm(q, 1) = 25 AND vm(q, 0) >= x AND vm(q, 0) <= x + 2 THEN lives = lives - 1
    IF vm(q, 1) > 24 THEN LOCATE 25, vm(q, 0): PRINT f$; : vm(q, 0) = 0
  END IF
NEXT
IF qwerty = 0 THEN lv = lv + 1: score = score + 50: GOTO pp
IF lives = 0 THEN GOTO thend
GOTO pl:

loselife:
lives = lives - 1
IF lives = 0 THEN GOTO thend
GOTO pl

thend:
LOCATE 2, 1
IF lives = 0 THEN PRINT " Sorry, but the 'Vaders won.                        "
IF q$ = CHR$(27) THEN PRINT " You quit.                                           "
END

duh:
RESUME NEXT

