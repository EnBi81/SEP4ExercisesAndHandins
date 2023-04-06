#include <stdio.h>
#include "account.h"

void print_account(account_t);
void print_account_status(account_status);
void print_line();

int main() {

    // only creating 2 accounts instead of 10 because why would I create 10????

    account_t acc1 = account_create(1, 100);
    account_t acc2 = account_create(2, 500);

    print_account(acc1);
    print_account(acc2);

    print_line();

    account_status s1 = account_deposit(acc1, 200);
    print_account_status(s1);
    print_account(acc1);
    print_account(acc2);

    account_status s2 = account_withdraw(acc1, 290);
    print_account_status(s2);
    print_account(acc1);
    print_line();

    account_status s3 = account_withdraw(acc1, 20);
    print_account_status(s3);
    print_account(acc1);
    print_line();

    account_status s4 = account_deposit(acc2, 100);
    print_account_status(s4);
    print_account(acc2);
    print_line();

    account_status s5 = account_withdraw(acc2, 1000);
    print_account_status(s5);
    print_account(acc2);
    print_line();

    account_destroy(acc1);
    account_destroy(acc2);

    acc2 = NULL;

    account_status s6 = account_withdraw(acc2, 1000);
    print_account_status(s6);

    return 0;
}

void print_account(account_t acc){
    int accountNum = account_get_account_no(acc);
    double creditLimit = account_get_credit_limit(acc);
    double balance = account_get_balance(acc);

    printf("account number %d with credit limit %f has balance of %f\n", accountNum, creditLimit, balance);
}

void print_line(){
    printf("\n");
}

void print_account_status(account_status as){
    if(as == OK){
        printf("account status: OK");
    }
    else if(as == OVER_MAX_CREDIT_LIMIT){
        printf("account status: OVER_MAX_CREDIT_LIMIT");
    }
    else {
        printf("account status: ACCOUNT_NOT_INSTANTIATED");
    }

    printf("\n");

}