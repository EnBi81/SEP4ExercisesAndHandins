
typedef enum account_status {
    OK,
    OVER_MAX_CREDIT_LIMIT,
    ACCOUNT_NOT_INSTANTIATED
} account_status;

typedef struct account* account_t;

account_t account_create(int accountNo, double creditLimit);
void account_destroy(account_t acc);
account_status account_withdraw(account_t acc, double amount);
account_status account_deposit(account_t acc, double amount);
double account_get_balance(account_t acc);
double account_get_credit_limit(account_t acc);
int account_get_account_no(account_t acc);